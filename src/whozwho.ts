import { defaultConfig, WhozwhoConfig } from './config';
import axios, { AxiosRequestConfig } from 'axios';
import { Advice } from './models/advice';
import { AdviceStatus, AdviceType } from './enums/advice-types';
import { Answer, Question } from './enums/question-types';

export class Whozwho {
  private readonly hi: {
    weight: number;
    alivePeriodInSec: number;
    version: string;
    last100Errors: any[];
  };

  private readonly options: AxiosRequestConfig;
  private readonly config: WhozwhoConfig;

  constructor(config: Partial<WhozwhoConfig> = {}) {
    this.config = {
      ...defaultConfig,
      ...config,
    };

    this.hi = {
      weight: this.config.whozwho.weight,
      alivePeriodInSec: this.config.whozwho.alivePeriodInSec,
      version: this.config.deploy.version,
      last100Errors: [],
    };

    this.options = {
      headers: {
        Host: `${this.config.whozwho.myUrl}`,
        Forwarded: `for=${this.config.whozwho.category};by=${this.config.whozwho.id}`,
      },
      timeout: 10000,
    };
  }

  async getAdvices(): Promise<Advice[]> {
    if (this.config.whozwho.disabled) {
      return [];
    }

    try {
      await axios.post(this.config.whozwho.serverUrl + '/hi', this.getHi(), this.options);
      const adviceResponse = await axios.get(
        `${this.config.whozwho.serverUrl}/advices`,
        this.options
      );
      const advicesResponse = adviceResponse?.data?.advices?.length
        ? adviceResponse.data.advices
        : [];
      return advicesResponse.map((a: Advice) => new Advice(a.id, a.type));
    } catch (e: any) {
      if (e?.status !== 404) {
        console.error('[whozwho] pb with advice', e);
      } else {
        // no advice => no pb
      }
    }

    return [];
  }

  async mentionThatAdviceIsOnGoing(advice: Advice): Promise<void> {
    if (this.config.whozwho.disabled) {
      return;
    }

    try {
      const mention = {
        status: AdviceStatus.ONGOING,
      };
      await axios.put(
        `${this.config.whozwho.serverUrl}/advices/${advice.id}`,
        mention,
        this.options
      );
    } catch (e) {
      console.error('[whozwho] pb with advice on going', e);
    }
  }

  async postAdvice(adviceType: AdviceType): Promise<Advice | null> {
    if (this.config.whozwho.disabled) {
      return null;
    }

    try {
      const advice = {
        type: adviceType,
      };
      await axios.post(this.config.whozwho.serverUrl + '/hi', this.getHi(), this.options);
      const adviceResponse = await axios.post(
        `${this.config.whozwho.serverUrl}/advices`,
        advice,
        this.options
      );
      return new Advice(adviceResponse.data.advice?.id, adviceResponse.data.advice?.type);
    } catch (e) {
      console.error('[whozwho] pb with advice', e);
    }

    return null;
  }

  async isPrincipal(): Promise<boolean> {
    if (this.config.whozwho.disabled) {
      return true;
    }

    try {
      const principalQuestion = {
        question: Question.PRINCIPAL,
      };

      await axios.post(this.config.whozwho.serverUrl + '/hi', this.getHi(), this.options);
      const principalResponse = await axios.post(
        `${this.config.whozwho.serverUrl}/actors`,
        principalQuestion,
        this.options
      );
      return principalResponse.data.answer === Answer.YES;
    } catch (e) {
      console.error('[whozwho] pb with principal', e);
    }

    return false;
  }

  async getPrincipalAddress(category: string) {
    if (this.config.whozwho.disabled) {
      return null;
    }

    try {
      const principalAddressQuestion = {
        category,
        question: Question.ADDRESS_PRINCIPAL,
      };

      await axios.post(this.config.whozwho.serverUrl + '/hi', this.getHi(), this.options);
      const principalResponse = await axios.post(
        `${this.config.whozwho.serverUrl}/actors`,
        principalAddressQuestion,
        this.options
      );

      return principalResponse.data;
    } catch (e) {
      console.error('[whozwho] pb with principal', e);
    }

    return {};
  }

  async getAllAddresses(category: string) {
    if (this.config.whozwho.disabled) {
      return null;
    }

    try {
      const allAddressQuestion = {
        category,
        question: Question.ADDRESS_ALL,
      };

      await axios.post(this.config.whozwho.serverUrl + '/hi', this.getHi(), this.options);
      const response = await axios.post(
        `${this.config.whozwho.serverUrl}/actors`,
        allAddressQuestion,
        this.options
      );

      return response.data;
    } catch (e) {
      console.error('[whozwho] pb with principal', e);
    }

    return {};
  }

  private getHi(lastLogs?: string[]) {
    const hi = { ...this.hi };
    let last100Errors: string[] = [];
    try {
      last100Errors = lastLogs ?? [];
      if (lastLogs && lastLogs.length > 100) {
        last100Errors = lastLogs.slice(lastLogs.length - 100);
      }
    } catch (e) {
      console.error('logs issue:', e);
    }

    hi.last100Errors = last100Errors as any;
    return hi;
  }
}

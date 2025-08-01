import {defaultConfig, WhozwhoConfig} from './config';
import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {Advice} from './models/advice';
import {AdviceStatus, AdviceType} from './enums/advice-types';
import {Answer, Question} from './enums/question-types';

export interface ActorInfo {
    actorId?: number;
    actorAddress?: string;
    weight?: number;
    isPrincipal?: boolean;
    version?: string;
    last100Errors?: string[];
}

export class Whozwho {
    private readonly hi: {
        weight: number;
        alivePeriodInSec: number;
        version: string;
        last100Errors: string[];
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

    async getAdvices(lastLogs?: string[]): Promise<Advice[]> {
        if (this.config.whozwho.disabled) {
            return [];
        }

        try {
            await axios.post(
                this.config.whozwho.serverUrl + '/hi',
                this.getHi(lastLogs),
                this.options
            );
            const adviceResponse = await axios.get(
                `${this.config.whozwho.serverUrl}/advices`,
                this.options
            );
            const advicesResponse = adviceResponse?.data?.advices?.length
                ? adviceResponse.data.advices
                : [];
            return advicesResponse.map((a: Advice) => new Advice(a.id, a.type));
        } catch (e: unknown) {
            if ((e as AxiosError)?.status !== 404) {
                this.logError('pb with get advices', e);
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
            this.logError('pb with mentionThatAdviceIsOnGoing', e);
        }
    }

    async postAdvice(adviceType: AdviceType, lastLogs?: string[]): Promise<Advice | null> {
        if (this.config.whozwho.disabled) {
            return null;
        }

        try {
            const advice = {
                type: adviceType,
            };
            await axios.post(
                this.config.whozwho.serverUrl + '/hi',
                this.getHi(lastLogs),
                this.options
            );
            const adviceResponse = await axios.post(
                `${this.config.whozwho.serverUrl}/advices`,
                advice,
                this.options
            );
            return new Advice(adviceResponse.data.advice?.id, adviceResponse.data.advice?.type);
        } catch (e) {
            this.logError('pb with postAdvice', e);
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
            this.logError('pb with isPrincipal', e);
        }

        return false;
    }

    async getPrincipalAddress(
        category: string
    ): Promise<{actorId: number; actorAddress: string} | undefined> {
        if (this.config.whozwho.disabled) {
            return;
        }

        try {
            const actorsFilter = `?category=${category}&principal=true`;

            await axios.post(this.config.whozwho.serverUrl + '/hi', this.getHi(), this.options);
            const response = await axios.get(
                `${this.config.whozwho.serverUrl}/actors${actorsFilter}`,
                this.options
            );

            const actors: {actorId: number; actorAddress: string}[] = response?.data?.actors ?? [];
            return actors.length > 0 ? actors[0] : undefined;
        } catch (e) {
            this.logError('pb with principalAddress', e);
        }
    }

    async getAllAddresses(category: string): Promise<ActorInfo[]> {
        if (this.config.whozwho.disabled) {
            return [];
        }

        try {
            const actorsFilter = `?category=${category}`;

            await axios.post(this.config.whozwho.serverUrl + '/hi', this.getHi(), this.options);
            const response = await axios.get(
                `${this.config.whozwho.serverUrl}/actors${actorsFilter}`,
                this.options
            );

            return response.data?.actors ?? [];
        } catch (e) {
            this.logError('pb with principalAllAddresses', e);
        }

        return [];
    }

    async getMyAddress(): Promise<string> {
        return this.config.whozwho.myUrl;
    }

    private getHi(lastLogs?: string[]) {
        let last100Errors: string[] = [];
        try {
            last100Errors = lastLogs ?? [];
            if (lastLogs && lastLogs.length > 100) {
                last100Errors = lastLogs.slice(lastLogs.length - 100);
            }
        } catch (e) {
            this.logError('logs issue:', e);
        }

        if (last100Errors?.length) {
            this.hi.last100Errors = last100Errors;
        }

        return {...this.hi};
    }

    private logError(message: string, error?: unknown): void {
        let errorMessage = error instanceof Error ? error.message : error;
        errorMessage = JSON.stringify(errorMessage).substring(0, 199) + '...';
        console.error(`[whozwho](${this.config.whozwho.serverUrl}) ${message}:`, errorMessage);
    }
}

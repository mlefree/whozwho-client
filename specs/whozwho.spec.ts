import { Advice, AdviceType, Question, Whozwho, WhozwhoConfig } from '../src';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Whozwho', () => {
  let whozwho: Whozwho;
  const testConfig: WhozwhoConfig = {
    whozwho: {
      serverUrl: 'http://test-url',
      myUrl: 'http://my-url',
      category: 'test-category',
      id: 1,
      weight: 1,
      alivePeriodInSec: 60,
      disabled: false,
    },
    deploy: {
      version: '1.0.0',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    whozwho = new Whozwho(testConfig);
  });

  describe('isPrincipal', () => {
    it('should return true when service confirms principal status', async () => {
      mockedAxios.post.mockResolvedValueOnce({}).mockResolvedValueOnce({ data: { answer: 'yes' } });

      const result = await whozwho.isPrincipal();

      expect(result).toBe(true);
      expect(mockedAxios.post).toHaveBeenCalledTimes(2); // One for hi, one for actors
    });

    it('should return false when service denies principal status', async () => {
      mockedAxios.post.mockResolvedValueOnce({}).mockResolvedValueOnce({ data: { answer: 'no' } });

      const result = await whozwho.isPrincipal();

      expect(result).toBe(false);
    });

    it('should return false when service fails', async () => {
      mockedAxios.post.mockResolvedValueOnce({}).mockRejectedValueOnce(new Error('Service error'));

      const result = await whozwho.isPrincipal();

      expect(result).toBe(false);
    });

    it('should return true when client is disabled', async () => {
      const disabledWhozwho = new Whozwho({
        whozwho: {
          ...testConfig.whozwho,
          disabled: true,
        },
      });

      const result = await disabledWhozwho.isPrincipal();

      expect(result).toBe(true);
      expect(mockedAxios.post).not.toHaveBeenCalled();
    });
  });

  describe('getAdvices', () => {
    it('should return array of advices when service responds', async () => {
      const mockAdvices = [
        { id: '1', type: AdviceType.UPDATE },
        { id: '2', type: AdviceType.UPDATE },
      ];

      mockedAxios.post.mockResolvedValueOnce({});
      mockedAxios.get.mockResolvedValueOnce({
        data: { advices: mockAdvices },
      });

      const result = await whozwho.getAdvices();

      expect(result).toHaveLength(2);
      expect(result[0]).toBeInstanceOf(Advice);
      expect(result[0].id).toBe('1');
      expect(result[0].type).toBe(AdviceType.UPDATE);
    });

    it('should return empty array when service has no advices', async () => {
      mockedAxios.post.mockResolvedValueOnce({});
      mockedAxios.get.mockResolvedValueOnce({
        data: { advices: [] },
      });

      const result = await whozwho.getAdvices();

      expect(result).toHaveLength(0);
    });

    it('should return empty array when service fails', async () => {
      mockedAxios.post.mockResolvedValueOnce({});
      mockedAxios.get.mockRejectedValueOnce(new Error('Service error'));

      const result = await whozwho.getAdvices();

      expect(result).toHaveLength(0);
    });

    it('should return empty array when client is disabled', async () => {
      const disabledWhozwho = new Whozwho({
        whozwho: {
          ...testConfig.whozwho,
          disabled: true,
        },
      });

      const result = await disabledWhozwho.getAdvices();

      expect(result).toHaveLength(0);
      expect(mockedAxios.post).not.toHaveBeenCalled();
      expect(mockedAxios.get).not.toHaveBeenCalled();
    });
  });

  describe('postAdvice', () => {
    it('should create and return new advice', async () => {
      const mockAdvice = {
        id: '1',
        type: AdviceType.UPDATE,
      };

      mockedAxios.post.mockResolvedValueOnce({}).mockResolvedValueOnce({
        data: { advice: mockAdvice },
      });

      const result = await whozwho.postAdvice(AdviceType.UPDATE);

      expect(result).toBeInstanceOf(Advice);
      expect(result?.id).toBe('1');
      expect(result?.type).toBe(AdviceType.UPDATE);
    });

    it('should return null when service fails', async () => {
      mockedAxios.post.mockResolvedValueOnce({}).mockRejectedValueOnce(new Error('Service error'));

      const result = await whozwho.postAdvice(AdviceType.UPDATE);

      expect(result).toBeNull();
    });

    it('should return null when client is disabled', async () => {
      const disabledWhozwho = new Whozwho({
        whozwho: {
          ...testConfig.whozwho,
          disabled: true,
        },
      });

      const result = await disabledWhozwho.postAdvice(AdviceType.UPDATE);

      expect(result).toBeNull();
      expect(mockedAxios.post).not.toHaveBeenCalled();
    });
  });

  describe('mentionThatAdviceIsOnGoing', () => {
    it('should update advice status', async () => {
      const advice = new Advice('1', AdviceType.UPDATE);

      mockedAxios.put.mockResolvedValueOnce({});

      await whozwho.mentionThatAdviceIsOnGoing(advice);

      expect(mockedAxios.put).toHaveBeenCalledWith(
        expect.stringContaining('/advices/1'),
        expect.objectContaining({ status: 'onGoing' }),
        expect.any(Object),
      );
    });

    it('should handle service errors gracefully', async () => {
      const advice = new Advice('1', AdviceType.UPDATE);

      mockedAxios.put.mockRejectedValueOnce(new Error('Service error'));

      // This should not throw an error
      await expect(whozwho.mentionThatAdviceIsOnGoing(advice)).resolves.not.toThrow();
    });

    it('should do nothing when client is disabled', async () => {
      const advice = new Advice('1', AdviceType.UPDATE);
      const disabledWhozwho = new Whozwho({
        whozwho: {
          ...testConfig.whozwho,
          disabled: true,
        },
      });

      await disabledWhozwho.mentionThatAdviceIsOnGoing(advice);

      expect(mockedAxios.put).not.toHaveBeenCalled();
    });
  });

  describe('constructor', () => {
    it('should use default config when no config provided', () => {
      const defaultWhozwho = new Whozwho();
      expect(defaultWhozwho).toBeInstanceOf(Whozwho);
    });

    it('should merge provided config with defaults', () => {
      const partialConfig: Partial<WhozwhoConfig> = {
        whozwho: {
          serverUrl: 'http://custom-url',
          myUrl: 'http://my-url',
          category: 'custom-category',
          id: 2,
          weight: 2,
          alivePeriodInSec: 120,
          disabled: true,
        },
      };
      const customWhozwho = new Whozwho(partialConfig);
      expect(customWhozwho).toBeInstanceOf(Whozwho);
    });
  });

  describe('getPrincipalAddress', () => {
    it('should return address when service responds', async () => {
      mockedAxios.post.mockResolvedValueOnce({}).mockResolvedValueOnce({
        data: { answer: { 123: 'http://principal-address' } },
      });

      const result = await whozwho.getPrincipalAddress('test-category');

      expect(result).toEqual({ 123: 'http://principal-address' });
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/actors'),
        expect.objectContaining({
          category: 'test-category',
          question: Question.ADDRESS_PRINCIPAL,
        }),
        expect.any(Object),
      );
    });

    it('should return empty object when service fails', async () => {
      mockedAxios.post.mockResolvedValueOnce({}).mockRejectedValueOnce(new Error('Service error'));

      const result = await whozwho.getPrincipalAddress('test-category');

      expect(result).toEqual({});
    });

    it('should return null when client is disabled', async () => {
      const disabledWhozwho = new Whozwho({
        whozwho: {
          ...testConfig.whozwho,
          disabled: true,
        },
      });

      const result = await disabledWhozwho.getPrincipalAddress('test-category');

      expect(Object.keys(result).length).toBe(0);
      expect(mockedAxios.post).not.toHaveBeenCalled();
    });
  });

  describe('getAllAddresses', () => {
    it('should return addresses when service responds', async () => {
      mockedAxios.post.mockResolvedValueOnce({}).mockResolvedValueOnce({
        data: { answer: { 1: 'http://address1', 2: 'http://address2' } },
      });

      const result = await whozwho.getAllAddresses('test-category');

      expect(result).toEqual({ 1: 'http://address1', 2: 'http://address2' });
      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/actors'),
        expect.objectContaining({
          category: 'test-category',
          question: Question.ADDRESS_ALL,
        }),
        expect.any(Object),
      );
    });

    it('should return empty object when service fails', async () => {
      mockedAxios.post.mockResolvedValueOnce({}).mockRejectedValueOnce(new Error('Service error'));

      const result = await whozwho.getAllAddresses('test-category');

      expect(result).toEqual({});
    });

    it('should return null when client is disabled', async () => {
      const disabledWhozwho = new Whozwho({
        whozwho: {
          ...testConfig.whozwho,
          disabled: true,
        },
      });

      const result = await disabledWhozwho.getAllAddresses('test-category');

      expect(Object.keys(result).length).toBe(0);
      expect(mockedAxios.post).not.toHaveBeenCalled();
    });
  });
});

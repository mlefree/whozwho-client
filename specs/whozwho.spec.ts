import { Whozwho, Advice, AdviceType, WhozwhoConfig } from '../src';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Whozwho', () => {
  let whozwho: Whozwho;
  const testConfig: Partial<WhozwhoConfig> = {
    whozwho: {
      url: 'http://test-url',
      category: 'test-category',
      id: 'test-id',
      weight: 1,
      alivePeriodInSec: 60,
      mocked: false
    },
    deploy: {
      version: '1.0.0'
    }
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
  });

  describe('getAdvices', () => {
    it('should return array of advices when service responds', async () => {
      const mockAdvices = [
        { id: '1', type: AdviceType.UPDATE },
        { id: '2', type: AdviceType.UPDATE }
      ];
      
      mockedAxios.post.mockResolvedValueOnce({});
      mockedAxios.get.mockResolvedValueOnce({ 
        data: { advices: mockAdvices } 
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
        data: { advices: [] } 
      });
      
      const result = await whozwho.getAdvices();
      
      expect(result).toHaveLength(0);
    });
  });

  describe('postAdvice', () => {
    it('should create and return new advice', async () => {
      const mockAdvice = { 
        id: '1', 
        type: AdviceType.UPDATE 
      };
      
      mockedAxios.post.mockResolvedValueOnce({}).mockResolvedValueOnce({ 
        data: { advice: mockAdvice } 
      });
      
      const result = await whozwho.postAdvice(AdviceType.UPDATE);
      
      expect(result).toBeInstanceOf(Advice);
      expect(result?.id).toBe('1');
      expect(result?.type).toBe(AdviceType.UPDATE);
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
        expect.any(Object)
      );
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
          url: 'custom-url',
          category: 'custom-category',
          id: 'custom-id',
          weight: 2,
          alivePeriodInSec: 120,
          mocked: true
        }
      };
      const customWhozwho = new Whozwho(partialConfig);
      expect(customWhozwho).toBeInstanceOf(Whozwho);
    });
  });
}); 
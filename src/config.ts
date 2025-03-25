export interface WhozwhoConfig {
  whozwho: {
    url: string;
    category: string;
    id: number;
    weight: number;
    alivePeriodInSec: number;
    mocked?: boolean;
  };
  deploy: {
    version: string;
  };
}

export const defaultConfig: WhozwhoConfig = {
  whozwho: {
    url: 'http://localhost:3000',
    category: 'default',
    id: 1,
    weight: 1,
    alivePeriodInSec: 60,
    mocked: false,
  },
  deploy: {
    version: '0.1.0',
  },
};

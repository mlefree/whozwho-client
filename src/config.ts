export interface WhozwhoConfig {
  whozwho: {
    url: string;
    category: string;
    id: string;
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
    id: 'default',
    weight: 1,
    alivePeriodInSec: 60,
    mocked: false,
  },
  deploy: {
    version: '0.1.0',
  },
};

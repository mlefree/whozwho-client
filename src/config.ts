export interface WhozwhoConfig {
    whozwho: {
        serverUrl: string;
        myUrl: string;
        category: string;
        id: number;
        weight: number;
        alivePeriodInSec: number;
        disabled?: boolean;
    };
    deploy: {
        version: string;
    };
}

export const defaultConfig: WhozwhoConfig = {
    whozwho: {
        serverUrl: 'http://localhost:3003',
        myUrl: 'http://localhost:3000',
        category: 'default',
        id: 1,
        weight: 1,
        alivePeriodInSec: 60,
        disabled: false,
    },
    deploy: {
        version: '0.1.0',
    },
};

import {
    AxiosInstance,
    AxiosRequestConfig
} from 'axios';

declare module 'axios' {
    export interface AxiosRequestConfig {
        load: boolean;
    }
    export interface AxiosStatic {
        baseURL: string;
        create({ baseURL: string, timeout: number }): AxiosInstance;
        axios: AxiosInstance;
    }
    export interface AxiosResponse<T = any> {
        load: boolean;
    }
    interface AxiosInstance {
        (config: AxiosRequestConfig): Promise<any>;
    }
}

declare module 'vue/types/vue' {
    interface Vue {
        axios: AxiosInstance;
    }
    interface VueConstructor {
        axios: AxiosStatic | AxiosInstace;
    }
}
import {
    AxiosInstance,
    AxiosRequestConfig
} from 'axios';

declare module 'axios' {
    interface AxiosInstance {
        (config: AxiosRequestConfig): Promise<any>;
    }

    export interface AxiosStatic {
        baseURL: string;
        create({ baseURL: string, timeout: number }): AxiosInstance;
        axios: AxiosInstance;
    }

    export interface AxiosRequestConfig {
        load: boolean;
    }

    export interface AxiosResponse<T = any> {
        load: boolean;
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
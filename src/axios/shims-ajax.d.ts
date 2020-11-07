import {
    AxiosInstance,
    AxiosRequestConfig
} from 'axios';

declare module 'axios' {
    export interface AxiosRequestConfig {
        load: boolean;
    }
    export interface AxiosStatic{
        baseURL: string;
        create({baseURL: string,timeout: number}): AxiosInstance;
    }
    export interface AxiosResponse<T = any>{
        load: boolean;
    }

}
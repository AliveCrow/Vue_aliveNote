"use strict";

import Vue from 'vue';
import axios from "axios";
import router from '@/router';


const baseUrl = 'http://localhost:3000';
const apiUrl = ''

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const option = {
    baseURL: baseUrl,
    timeout: 5000,
    // timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};

// 创建一个axios实例
const _axios = axios.create(option);


export interface AxiosRequestConfig<T> {
    load: boolean;
}

// request拦截器 ==> 对请求参数进行处理
_axios.interceptors.request.use((config) => {
        // 可以在发送请求之前做些事情
        // 比如请求参数的处理、在headers中携带token等等
        config.headers.load = false
        if(localStorage.getItem('jwt_token')){
            config.headers.Authorization  = localStorage.getItem('jwt_token')
        }
        return config;
},
    function(error) {
        // 处理请求错误
        return Promise.reject(error);
    }
);

// respone拦截器 ==> 对响应做处理
_axios.interceptors.response.use((response) => {
        // Do something with response data
        response.load = true
        if(response.status!==200){
            router.replace('/login').then(()=>Vue.$toast.error('token过期'))
        }
        return response;
    },
    function(error) {
        // Do something with response error
        let errorText :{
            status?:number,
            msg:string,
        }
        let err = JSON.parse(JSON.stringify(error.response))
        switch (err.status) {
            case 404:
                err.msg='请求错误'
                break
            case 401:
                err.msg='token失效'
                router.replace('/login').then(r =>{})
                break
            case 500:
                err.msg='服务器错误'
                break
            default:
                err.msg='连接服务器失败,请退出重试!'
        }
        errorText={
            status:err.status,
            msg:err.msg
        }
        return Promise.reject(errorText)
    }
);

export default _axios;


"use strict";

import Vue from 'vue';
import axios from "axios";
require('dotenv').config() // 默认读取项目根目录下的.env文件


const VUE_APP_BASE_API_DEV = 'http://localhost:3000';
const VUE_APP_BASE_API_PROD = ''

// Full config:  https://github.com/axios/axios#request-config
axios.defaults.baseURL = process.env.VUE_APP_BASE_API_DEV
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
    timeout:5000,
    // timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};

// 创建一个axios实例
const _axios = axios.create(config);

// request拦截器 ==> 对请求参数进行处理
_axios.interceptors.request.use(
    function(config) {
        // 可以在发送请求之前做些事情
        // 比如请求参数的处理、在headers中携带token等等
        return config;
    },
    function(error) {
        // 处理请求错误
        return Promise.reject(error);
    }
);

// respone拦截器 ==> 对响应做处理
_axios.interceptors.response.use(
    function(response) {
        // Do something with response data
        return response;
    },
    function(error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

export default _axios;


import axios from "axios";

// 创建一个axios实例
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // 请求超时时间
  timeout: 3000
});

// 添加请求拦截器
request.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    console.log(err);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  response => {
    const res = {};
    res.status = response.status;
    res.data = response.data;
    return res;
  },
  err => {
    console.log(err);
  }
);

export default request;

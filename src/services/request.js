import axios from 'axios';

const service = axios.create({
  // Todo: 环境
  baseURL: '',
  timeout: 5000,
  withCredentials: 'true',
});

const errorHandler = (error) => {
  const { response } = error.response;
  switch (response) {
    // 鉴权失败，未登录
    case 401:
      break;
    // 禁止访问，token过期
    case 403:
      break;
    // 请求不存在
    case 404:
      break;
    default:
      console.log(response);
  }
};

// service.interceptors.request.use((config) => {
//   // Todo: 请求拦截器处理、loading
// });

service.interceptors.response.use(
  (response) => {
    // Todo：loading
    if (response.status === 200) {
      return Promise.resolve(response);
    }
    return Promise.reject(response);
  },
  (error) => {
    // Todo：loading
    errorHandler(error);
    return Promise.reject(error);
  },
);

export default service;

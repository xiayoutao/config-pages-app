import axios from 'axios';
import qs from 'qs';
import merge from 'lodash/merge';

const http = axios.create({
  timeout: 1000 * 8,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

/**
 * 请求拦截
 */
http
  .interceptors
  .request
  .use(config => {
    return config;
  }, error => {
    return Promise.reject(error);
  });

/**
 * 响应拦截
 */
http
  .interceptors
  .response
  .use(response => {
    return response.data;
  }, error => {
    this.$notify('请求接口出错，请重试');
    return Promise.reject(error);
  });

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
  // 非生产环境 && 开启代理, 接口前缀统一使用[/api/]前缀做代理拦截!
  return (process.env.NODE_ENV !== 'production'
    ? '/api'
    : window.SITE_CONFIG.baseUrl) + actionName;
};

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = true) => {
  var defaults = {
    't': new Date().getTime()
  };
  return openDefultParams
    ? merge(defaults, params)
    : params;
};

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
  var defaults = {
    't': new Date().getTime()
  };
  data = openDefultdata
    ? merge(defaults, data)
    : data;
  return contentType === 'json'
    ? JSON.stringify(data)
    : qs.stringify(data);
};

http.handleData = options => {
  options = Object.assign({
    processing: true, // 是否处理数据
    successCode: 1, // 成功返回回调状态
    code: 1, // 接口返回状态
    result: {}, // 请求接口回调数据
  }, options);
  console.log(options);
  if (options.processing) {
    if (options.code === options.successCode) {
      return options.result || true;
    }
    return false;
  }
  return options.result;
};

/**
 * 统一处理请求返回
 */
// export function httpResponseHandle (respData) {
//   if (respData && respData.code === 0) {
//     return respData.result
//       ? respData.result
//       : true; // 如果没有result值，则返回true （一般是操作性的接口才会出现result没有值）
//   } else if (respData.code === 99999) {
//     if (location.href.indexOf('/login') < 0) {
//       location.href = '/login';
//     }
//   }
//   this.$notify(respData.msg);
//   return false;
// }

export default http;

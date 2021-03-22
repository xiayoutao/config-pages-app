/* eslint-disable no-undef */
import {
  getCurrentInstance,
} from 'vue';
import {
  topWindowOrigin,
} from '@/common/constants';

// 发送消息
export function postMessage(theWindow, data, delay = 0, origin) {
  origin = origin || topWindowOrigin;
  if (data instanceof Array || data instanceof Object) {
    data = JSON.stringify(data);
  }
  setTimeout(() => {
    theWindow.postMessage(data, origin);
  }, delay);
}

// 获取当前Vue实例对象app
export function getCurrentApp() {
  const instance = getCurrentInstance();
  return instance.appContext.app;
}

// 微信公众号配置
export function wxConfig(data) {
  return new Promise((resolve, reject) => {
    wx.config({
      debug: data.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: data.appId, // 必填，公众号的唯一标识
      timestamp: data.timestamp, // 必填，生成签名的时间戳
      nonceStr: data.nonceStr, // 必填，生成签名的随机串
      signature: data.signature,// 必填，签名
      jsApiList: data.jsApiList, // 必填，需要使用的JS接口列表
    });
    wx.ready(() => {
      resolve();
    });
    wx.error(() => {
      reject();
    });
  });
}
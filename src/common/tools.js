import {
  getCurrentInstance,
} from 'vue';
import {
  topWindowOrigin,
} from '@/constants';

// 发送消息
export function postMessage (theWindow, data, delay = 0, origin) {
  origin = origin || topWindowOrigin;
  if (data instanceof Array || data instanceof Object) {
    data = JSON.stringify(data);
  }
  setTimeout(() => {
    theWindow.postMessage(data, origin);
  }, delay);
}

// 获取当前Vue实例对象app
export function getCurrentApp () {
  const instance = getCurrentInstance();
  return instance.appContext.app;
}
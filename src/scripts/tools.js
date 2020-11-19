import {
  topWindowOrigin,
} from '@/constants';

// 发送消息
export function postMessage (theWindow, data, delay = 0, origin) {
  origin = origin || topWindowOrigin;
  setTimeout(() => {
    theWindow.postMessage(data, origin);
  }, delay);
}
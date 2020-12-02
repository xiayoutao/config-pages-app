import store from '@/store';

// 发送消息
export function postMessage (theWindow, data, delay = 0, origin) {
  origin = origin || store.state.global.topWindowOrigin;
  console.log('origin', origin);
  setTimeout(() => {
    theWindow.postMessage(data, origin);
  }, delay);
}
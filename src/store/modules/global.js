import {
  iconfont,
  tableEmptyText,
  cdnUrl,
  upload,
  topWindowOrigin,
} from '@/constants';

export default {
  namespaced: true,
  state: {
    timestampDiff: 0, // 与服务器时间戳相差值，当前服务器时间 = new Date().getTime() + timestampDiff;
    cdnUrl,
    upload,
    topWindowOrigin,
    ajaxLoading: false, // ajax请求中
    iconfont,
    tableEmptyText, // 表格无数据显示内容
  },
  mutations: {
    setTimestampDiff (state, diff) {
      state.timestampDiff = diff;
    },
    setAjaxLoading (state, loading) {
      state.ajaxLoading = loading;
    }
  }
};

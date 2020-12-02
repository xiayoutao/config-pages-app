export default {
  namespaced: true,
  state: {
    timestampDiff: 0, // 与服务器时间戳相差值，当前服务器时间 = new Date().getTime() + timestampDiff;
    iconfont: ' iconfont ',
    tableEmptyText: '暂时没有内容显示', // 表格无数据显示内容
    cdnUrl: window.SITE_CONFIG.cdnUrl,
    upload: window.SITE_CONFIG.upload,
    ajaxLoading: false, // ajax请求中
    topWindowOrigin: window.SITE_CONFIG.topWindowOrigin,
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

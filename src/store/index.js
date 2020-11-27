import {
  iconfont,
  tableEmptyText,
  cdnUrl,
  upload,
  topWindowOrigin,
} from '@/common/constants';

export default {
  timestampDiff: 0, // 与服务器时间戳相差值，当前服务器时间 = new Date().getTime() + timestampDiff;
  cdnUrl,
  upload,
  topWindowOrigin,
  iconfont,
  tableEmptyText, // 表格无数据显示内容
  ajaxLoading: false, // ajax请求中
};

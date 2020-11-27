import API from './urls.js';
import http from '@/common/axios.js';

// 获取页面布局
export async function getPageLayout (data) {
  const res = await http({
    url: http.adornUrl(API.getPageLayout),
    method: 'post',
    data: http.adornData(data),
  });
  return http.handleData({
    ...res,
  });
}
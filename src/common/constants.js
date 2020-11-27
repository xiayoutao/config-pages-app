const isProd = process.env.NODE_ENV === 'production';

export const siteName = '动态配置项目';
export const version = 'v0.01';
export const copyright = '©2020&nbsp;&nbsp;&nbsp;&nbsp;夏尤涛';
export const baseUrl = (isProd ? 'https://api.xiayoutao.wang' : '') + '/api';
export const cdnUrl =  `http://${isProd ? 'qiniu' : 'test'}.xiayoutao.wang/`;
export const upload = '//up-z2.qiniup.com/';
export const topWindowOrigin = isProd ? 'http://admin.xiayoutao.wang' : 'http://localhost:7000';
export const tableEmptyText = '暂时没有内容显示';  // 表格无数据显示内容
export const iconfont = 'iconfont ';

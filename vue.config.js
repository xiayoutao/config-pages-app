const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const path = require('path');
const resolve = dir => path.join(__dirname, dir);

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  lintOnSave: !isProd,
  productionSourceMap: !isProd,
  publicPath: '/', // 相对路径
  outputDir: 'dist',
  devServer: {
    open: true,
    port: 7002,
    proxy: {
      '/api': {
        // target: 'http://127.0.0.1:1339',
        target: 'https://api-test.xiayoutao.wang',
        ws: true,
        changeOrigin: true
      }
    }
  },
  configureWebpack: {},
  chainWebpack: config => {
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');

    config.resolve.alias
      .set('@', resolve('src'))
      .set('@cps', resolve('src/components'));

    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, {limit: 5120}));
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            hack: 'true; @import "~@/assets/styles/variables.less";'
          }
        },
      },
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5, // 换算的基数
            unitPrecision: 3,
            selectorBlackList: [], // 忽略转换正则匹配项
            propList: ['*', '!font-size']
          })
        ]
      }
    }
  },
};

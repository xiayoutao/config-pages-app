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
        target: 'http://127.0.0.1:1339',
        // target: 'https://config.xiayoutao.wang',
        ws: true,
        changeOrigin: true
      }
    }
  },
  configureWebpack: config => {
    config.optimization = {
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          },
          vant: {
            name: 'vant', // 单独将 vant 拆包
            priority: 1000, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
            test: /[\\/]node_modules[\\/]vant[\\/]/,
            chunks: 'all',
            reuseExistingChunk: true
          },
        }
      },
    };
  },
  chainWebpack: config => {
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');

    config.resolve.alias
      .set('@', resolve('src'));

    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, {limit: 5120}));
  },
  css: {
    loaderOptions: {
      // less: {
      //   modifyVars: {
      //     hack: 'true; @import "~@/styles/less/variables.less";'
      //   }
      // },
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

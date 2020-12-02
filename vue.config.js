/* eslint-disable camelcase */
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const path = require('path');
const resolve = dir => {
  return path.join(__dirname, dir);
};

const isProduction = process.env.npm_config_production === 'true';

module.exports = {
  lintOnSave: !isProduction,
  productionSourceMap: !isProduction,
  publicPath: '/', // 相对路径
  outputDir: 'dist',
  devServer: {
    open: true,
    port: 7001,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:1339',
        // target: 'https://config.xiayoutao.wang',
        ws: true,
        changeOrigin: true
      }
    }
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
      minimizer: [
        // 压缩es6
        new TerserPlugin({
          parallel: true, // 并行压缩
          cache: true, // 缓存
          sourceMap: false,
          terserOptions: {
            warnings: false,
            ie8: false,
            compress: {
              warnings: false, // 删除没有用到的代码时不输出警告
              drop_console: isProduction, // 移除console
              // pure_funcs: ['console.log'],
              drop_debugger: isProduction,
              // 提取出出现多次但是没有定义成变量去引用的静态值
              reduce_vars: true
            }
          }
        }),
        // 压缩提取的CSS,删除来自不同组件重复的css
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            safe: true,
            discardComments: {
              removeAll: true
            }
          }
        })
      ]
    };
  }
};

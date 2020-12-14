/*
 * @Description: 
 * @Author: yamanashi12
 * @Date: 2019-03-01 16:20:12
 * @LastEditTime: 2020-12-10 16:01:32
 * @LastEditors: Please set LastEditors
 */
// vue.config.js
/**
 * 如何配置webpack： https://cli.vuejs.org/guide/webpack.html
 * webpack Config: https://cli.vuejs.org/config/#vue-config-js
 * chainWebpack语法：https://github.com/mozilla-neutrino/webpack-chain
 *
 */
const path = require('path')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/generate/'
    : '/',
  outputDir: 'generate',
  lintOnSave: process.env.NODE_ENV !== 'production' ? 'error' : false,
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: '', // 代理域名
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js'
    }
  },
  configureWebpack: (config) => {
    config.resolve.alias = Object.assign(config.resolve.alias, {
      styles: resolve('src/styles'),
      components: resolve('src/components')
    })
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new MonacoWebpackPlugin()
          // new BundleAnalyzerPlugin()
        ],
        externals: [{
          'element-ui': 'ELEMENT',
          vue: 'Vue'
        }]
      }
    } 
    return {
      plugins: [
        new MonacoWebpackPlugin()
      ]
    }
  }
}

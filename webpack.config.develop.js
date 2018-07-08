const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');

module.exports = webpackMerge(commonConfig, {

  mode: 'development',

  module: {
    rules: [{
      test: /\.ts$/,
      enforce: 'pre',
      use: [{
        loader: 'tslint-loader',
        options: {
          emitErrors: true,
          failOnHint: true,
          resourcePath: 'src'
        }
      }]
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },

  devServer: {
    port: 4567,
    host: 'localhost',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    proxy: {
      '/api.github.com/*': {
        target: 'http://api.github.com/',
        secure: false,
        changeOrigin: true
      }
    }
  }

});
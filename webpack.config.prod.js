const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

module.exports = webpackMerge(commonConfig, {

  mode: 'production',

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
    }]
  }

});
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');
const DefinePlugin = require('webpack/lib/DefinePlugin');

module.exports = webpackMerge(commonConfig, {
  debug: true,
  devtool: 'cheap-module-source-map',

  output: {
    path: __dirname + './build',
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js',
    library: 'ac_[name]',
    libraryTarget: 'var',
  },

  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src'
  },

  devServer: {
    port: 4567,
    host: 'localhost',
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    outputPath: __dirname + '/build',
    proxy:{
      '/api.github.com/*': {
        target: 'http://api.github.com/',
        secure: false,
        changeOrigin: true
      }
    }
  }

});
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const WebpackMd5Hash = require('webpack-md5-hash');

const ENVIRONMENT = process.env.NODE_ENV = process.env.ENV = 'production';


module.exports = webpackMerge(commonConfig, {

  debug: false,

  devtool: 'source-map',

  output: {
    path: __dirname + '/build',
    filename: '[name].[chunkhash].bundle.js',
    sourceMapFilename: '[name].[chunkhash].bundle.map',
    chunkFilename: '[id].[chunkhash].chunk.js'
  },

  plugins: [

    new WebpackMd5Hash(),
    new DedupePlugin(),

    new DefinePlugin({
      'ENV': JSON.stringify(ENVIRONMENT),
      'process.env': {
        'ENV': JSON.stringify(ENVIRONMENT),
        'NODE_ENV': JSON.stringify(ENVIRONMENT)
      }
    }),

    new UglifyJsPlugin({
      beautify: false,
      mangle: { screw_ie8 : true, keep_fnames: true },
      compress: { screw_ie8: true },
      comments: false
    })
  ],

  tslint: {
    emitErrors: true,
    failOnHint: true,
    resourcePath: 'src'
  }

});
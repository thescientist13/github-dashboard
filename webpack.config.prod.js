const commonConfig = require('./webpack.config.common');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const HtmlCriticalPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const path = require('path');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const webpackMerge = require('webpack-merge');

module.exports = webpackMerge(commonConfig, {

  mode: 'production',

  optimization: {
    minimizer: [
      new UglifyJsWebpackPlugin(),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: { discardComments: { removeAll: true } }
      })
    ]
  },

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
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader'
      ]
    }]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css'
    }),

    // new HtmlCriticalPlugin({
    //   base: path.resolve(__dirname, 'build'),
    //   src: 'index.html',
    //   dest: 'index.html',
    //   inline: true
    // }),

    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })
  ]

});
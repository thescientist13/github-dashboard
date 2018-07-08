const commonConfig = require('./webpack.config.common');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlCriticalPlugin = require('html-critical-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
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
    // seems to lower the Lighthouse performance score a lot (from 87 -> 78)
    // but if more CSS gets added the project, maybe this would be useful to add back in?
    // splitChunks: {
    //   cacheGroups: {
    //     styles: {
    //       name: 'styles',
    //       test: /\.css$/,
    //       chunks: 'all',
    //       enforce: true
    //     }
    //   }
    // }
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

    new HtmlCriticalPlugin({
      base: path.resolve(__dirname, 'dist'),
      src: 'index.html',
      dest: 'index.html',
      inline: true
    }),

    new CompressionPlugin({
      exclude: /\.html/
    }),

    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })
  ]

});
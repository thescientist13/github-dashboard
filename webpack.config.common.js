// const { CheckerPlugin } = require('awesome-typescript-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  // context: path.join(__dirname, 'src'),

  // entry: {
  //   main: './index'
  // },

  // output: {
  //   path: path.join(__dirname, './build'),
  //   filename: '[name].bundle.js',
  //   sourceMapFilename: '[name].map',
  //   chunkFilename: '[id].chunk.js',
  //   library: 'ac_[name]',
  //   libraryTarget: 'var',
  // },

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader'
    }, {
    //   test: /\.html$/,
    //   loader: 'html-loader',
    //   exclude: path.join(__dirnamem, './src/index.html')
    // }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(jpg|png|gif)$/,
      loader: 'file-loader'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
    }]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunksSortMode: 'dependency'
    })
  ]
};
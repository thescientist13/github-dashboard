const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {

  context: path.resolve(__dirname, 'src'),
  
  entry: {
    index: './index.tsx'
  },

  output: {
    filename: '[name].[chunkhash].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].[chunkhash].js',
    sourceMapFilename: '[name].map'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader'
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
      template: './index.html',
      chunksSortMode: 'dependency'
    })
  ]
};
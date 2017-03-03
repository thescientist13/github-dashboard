const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

module.exports = {
  entry: {
    main: './src/index.tsx'
  },
  output: {
    filename: "./build/bundle.js",
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ["", ".ts", ".tsx", ".js"]
  },

  module: {
    loaders: [{
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      test: /\.tsx?$/,
      loader: "awesome-typescript-loader"
    }, {
      test: /\.html$/,
      loader: 'html-loader',
      exclude: [__dirname + './src/index.html']
    }, {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }, {
      test: /\.(jpg|png|gif)$/,
      loader: 'file'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader"
    }],

    preLoaders: [{
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      test: /\.js$/,
      loader: "source-map-loader"
    }]
  },

  plugins: [
    new ForkCheckerPlugin(),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'dependency'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'].reverse()
    }),

    new webpack.optimize.OccurenceOrderPlugin(true)
  ]
};
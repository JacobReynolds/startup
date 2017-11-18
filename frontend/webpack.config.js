var webpack = require('webpack');
var path = require('path');
var BUILD_DIR = path.resolve(__dirname, 'build/');
var APP_DIR = path.resolve(__dirname, './javascripts/');
var CSS_DIR = path.resolve(__dirname, './stylesheets/');

var config = {
  entry: [APP_DIR + '/index.js'],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  devServer: {
    port: 3001,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  module: {
    loaders: [{
        test: /\.jsx?/,
        include: APP_DIR,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2'],
          plugins: ['babel-plugin-transform-decorators-legacy']
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  devtool: 'source-map'
};

module.exports = config;

'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const env = process.env.NODE_ENV;
const version = String(require("./package.json").version);
const publicPath = './' + version + '/';

const config = {
  entry: './src/index.js',
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader?cacheDirectory'], exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!less')},
    ]
  },
  resolve: {
      modulesDirectories: ['node_modules', 'web_modules']
  },
  output: {
    path: './dist/' + version,
    filename: 'bundle.[hash].js',
    publicPath,
    //需要上传的目录
    uploadPath: './dist/',
  },
  plugins: [
    {
      apply: function apply(compiler) {
        compiler.parser.plugin('expression global', function expressionGlobalPlugin() {
          this.state.module.addVariable('global', "(function() { return this; }()) || Function('return this')()")
          return false
        })
      }
    },
    new CleanWebpackPlugin(['dist'], {
      verbose: true,
    }),
    new HtmlWebpackPlugin({
      title: '表格组件',
      filename: '../index.html',
      template: './src/html/template.html',
      favicon: './public/icon.ico',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    // last css
    new ExtractTextPlugin('./bundle.[hash].css'),
  ]
};

module.exports = config;

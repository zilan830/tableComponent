'use strict'

const webpack = require('webpack')
const env = process.env.NODE_ENV

const config = {
  target: 'web',
  entry: './src/index.js',
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['react-hot', 'babel-loader?cacheDirectory'], exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.less$/, loader: 'style!css!less'},
    ]
  },
  resolve: {
    // extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'web_modules']
  },
  output: {
    path: '/',
    filename: 'bundle.js',
  },
  //devtool相关说明，https://segmentfault.com/a/1190000004280859，可自己按照实际情况调整
  devtool: "#inline-source-map",
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./public/manifest.json'),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
  ],
};

module.exports = config;

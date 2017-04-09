import webpack from 'webpack';
import path from 'path';
import fs from 'fs';

let nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });
const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('development'),
  __DEV__: true
};
module.exports = {
  entry: './src/app.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'dev'),
    filename: 'nodeDiceServer.js'
  },
  externals: nodeModules,
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      noInfo: true, // set to false to see a list of every file being bundled.
    })
  ],
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader'] },
    ]
  }
};
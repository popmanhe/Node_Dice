import webpack from 'webpack';
import path from 'path';
import fs from 'fs';

let nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: './src/app.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'nodeDiceServer.js'
  },
   externals: nodeModules,
   plugins: [
    //   new webpack.DefinePlugin({
     //   __DEV__: true
    // }),
    // new webpack.BannerPlugin('require("source-map-support").install();',
    //                          { raw: true, entryOnly: false }),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      noInfo: true, // set to false to see a list of every file being bundled.
    })
   ],
  module: {
    rules: [
      {test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader']},
    ]}
}
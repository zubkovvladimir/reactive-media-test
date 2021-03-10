const path = require(`path`);
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');


function _path(p) {
  return path.join(__dirname, p);
}

module.exports = {
  entry: `./source/js/main.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `build/js`)
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  resolve: {
    alias: {
      'jquery.maskedinput': _path('node_modules/jquery.maskedinput/src/jquery.maskedinput.js')
    },
  },
  devtool: `source-map`,
};

const path = require(`path`);
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');


function _path(p) {
  return path.join(__dirname, p);
}

module.exports = {
  mode: 'none',
  context: path.resolve(__dirname, 'source'),
  entry: `./js/main.js`,
  output: {
    filename: `bundle.js`,
    path: _path(`build/js`)
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
  ],
  resolve: {
      alias: {
        'jquery.maskedinput': _path('node_modules/jquery.maskedinput/src/jquery.maskedinput.js')
      },
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          },
        },
      extractComments: false
    }),
  ],
  },
  devtool: `source-map`,
};

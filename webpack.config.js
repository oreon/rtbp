var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
          'webpack-dev-server/client?http://localhost:3000',
          './src/clnt/index'
        ],
        output: {
          path: path.join(__dirname, 'dist'),
          filename: 'bundle.js',
          publicPath: 'http://localhost:3000/assets/bundles/', // Tell django to use this URL to load packages and not use STATIC_URL + bundle_name
        },
  resolve: {
    extensions: ['', '.js', '.ts', '.tsx']
  },
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loaders: ['ts-loader'],
      include: path.join(__dirname, 'src')
    }]
  }
};

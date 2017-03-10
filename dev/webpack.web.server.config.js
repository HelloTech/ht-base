const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = {
  entry: "./src/server/index.js",
  output: {
    filename: "server.js",
    path: "./dev/build",
    publicPath: `http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}/assets/`
  },
  target: 'node',
  externals: [nodeExternals()],

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [ /node_modules/ ],
        use: [ 'babel-loader' ]
      },
      {
        test: /\.json?$/,
        use: [ 'json-loader' ]
      },
      {
        test: /\.sass$/,
        exclude: [ /node_modules/ ],
        use: [ 'null-loader' ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.(jpg|png|gif|ico)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/manifest.json/),
    new HtmlWebpackPlugin()
  ]
};

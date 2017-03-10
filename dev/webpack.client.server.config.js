const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const browserslist = require('../browserslist');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const OfflinePlugin = require('offline-plugin');

const extractCSS = new ExtractTextPlugin('styles.[name].[chunkhash].css');
const extractSASS = new ExtractTextPlugin('styles.[name]-two.[chunkhash].css');

module.exports = {
  entry: {
    app: [
      `webpack-dev-server/client?http://${process.env.HOST}:${process.env.PORT}`,
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      './dev/index.js'
    ],
    vendor: ['react', 'react-dom', 'react-helmet', 'react-router']
  },
  output: {
    filename: "[name].js",
    publicPath: `http://${process.env.HOST}:${process.env.PORT}/assets/`
  },
  devtool: 'cheap-module-inline-source-map',

  devServer: {
    stats: 'errors-only'
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [/node_modules/],
        use: ['babel-loader']
      },
      {
        test: /\.sass$/,
        use: extractSASS.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules&importLoaders=1&localIdentName=[local]!sass-loader',
        })
      },
      {
        test: /\.css$/,
        use: extractSASS.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules&importLoaders=1&localIdentName=[local]',
        })
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
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.LoaderOptionsPlugin({
    //   options: {
    //     context: __dirname,
    //     postcss: [autoprefixer({browsers: browserslist})]
    //   }
    // }),
    // new OfflinePlugin(),
    new InlineManifestWebpackPlugin(),
    new ManifestPlugin({}),
    extractCSS,
    extractSASS,
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor, manifest',
      minChunks: Infinity,
      filename: '[name].js'
    }),
    new HtmlWebpackPlugin({
      template: '/Users/pdiniz/work/ht-base/src/containers/document/index.html'
    })
  ]
};

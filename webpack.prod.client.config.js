const {resolve} = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OfflinePlugin = require('offline-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ManifestPlugin = require('webpack-manifest-plugin');
const browserslist = require('./browserslist');

const extractCSS = new ExtractTextPlugin('styles.[name].[chunkhash].css');
const extractSASS = new ExtractTextPlugin('styles.[name]-two.[chunkhash].css');

module.exports = {
  context: resolve('src'),
  entry: {
    app: "./index.js",
    vendor: ['react', 'react-dom', 'react-helmet', 'react-router']
  },
  output: {
    filename: "[name]-[hash].min.js",
    publicPath: "/assets/",
    path: "build/public"
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [ /node_modules/ ],
        use: [ 'babel-loader' ]
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
        test: /\.jpg$/,
        exclude: [ /node_modules/ ],
        use: 'file-loader?name=images/[path][name]-[hash].[ext]&context=src'
      }
    ]
  },

  plugins: [
    new webpack.EnvironmentPlugin([
      "NODE_ENV"
    ]),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: [ autoprefixer({ browsers: browserslist }) ]
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    }),
    extractCSS,
    extractSASS,
    new InlineManifestWebpackPlugin(),
    new ManifestPlugin({}),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity,
      filename: '[name]-[hash].min.js'
    }),
    new HtmlWebpackPlugin({
      template: './containers/document/index.html'
    }),
    // new OfflinePlugin()
  ]
};

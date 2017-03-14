const {resolve} = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OfflinePlugin = require('offline-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ManifestPlugin = require('webpack-manifest-plugin');
const browserslist = require('./browserslist');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const extractCSS = new ExtractTextPlugin({
  filename: '[name]-[chunkhash].min.css',
  allChunks: true
});
const extractSASS = new ExtractTextPlugin({
  filename: '[name]-[chunkhash]-2.min.css',
  allChunks: true
});

module.exports = {
  context: resolve('src'),
  entry: {
    app: "./index.js",
    vendor: ['react', 'react-dom', 'react-helmet', 'react-router']
  },
  output: {
    filename: "app.[chunkhash].min.js",
    publicPath: "/assets/",
    path: "build/public"
  },
  devtool: 'source-map',
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
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules&importLoaders=1&localIdentName=[local]',
        })
      },
      {
        test: /\.jpg$/,
        exclude: [/node_modules/],
        use: 'file-loader?name=images/[path][name]-[hash].[ext]&context=src'
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: '"production"'}
    }),
    new ProgressBarPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: [autoprefixer({browsers: browserslist})]
      }
    }),
    new ManifestPlugin({}),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      sourceMap: true
    }),
    extractCSS,
    extractSASS,
    new InlineManifestWebpackPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      filename: 'vendor-[chunkhash].min.js'
    }),
    new HtmlWebpackPlugin({
      template: './containers/document/index.html',
      favicon: './containers/document/favicon.ico'
    }),
    // new CopyWebpackPlugin([
    //   { from: 'containers/document/index.html', to: '' }
    // ]),
    new OfflinePlugin({
      rewrites: {
        'index.html': '/'
      }
    })
  ]
  // new OfflinePlugin({
  //   externals: ['containers/document/index.html'],
  // })  ]
  // [
  // new webpack.EnvironmentPlugin([
  //   "NODE_ENV"
  // ]),
  //   new webpack.LoaderOptionsPlugin({
  //     options: {
  //       context: __dirname,
  //       postcss: [ autoprefixer({ browsers: browserslist }) ]
  //     }
  //   }),
  //   new webpack.optimize.UglifyJsPlugin({
  //     compressor: {
  //       screw_ie8: true,
  //       warnings: false
  //     }
  //   }),
  //   new ExtractTextPlugin({
  //     filename: '[name]-[hash].min.css',
  //     allChunks: true
  //   }),
  //   new ManifestPlugin({}),
  //   new webpack.optimize.CommonsChunkPlugin({
  //     name: 'vendor',
  //     minChunks: Infinity,
  //     filename: '[name]-[hash].min.js'
  //   })
  // ]
};

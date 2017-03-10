const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const browserslist = require('../browserslist');

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
        loaders: [
          'style-loader',
          {
            loader: "css-loader",
            query: {sourceMap: true, modules: true, importLoaders: 1, localIdentName: "[local]"}
          },
          // uncomment if you need autoprefixer in dev environment
          // {
          //   use: "postcss"
          // },
          {
            loader: "sass-loader",
            query: {sourceMap: true}
          }
        ]
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
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: '[name].js'
    })
  ]
};

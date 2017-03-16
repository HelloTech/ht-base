const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const browserslist = require('../browserslist');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
// const extractVendorCSSPlugin = new ExtractTextPlugin('vendor.[contenthash].css');
const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');

// const isBuildingDll = Boolean(process.env.BUILDING_DLL);

// const vendorCSSLoaders = extractVendorCSSPlugin.extract({
//   fallback: 'style-loader',
//   use: ['css-loader', 'sass-loader'],
// });
// const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
// const ManifestPlugin = require('webpack-manifest-plugin');
// const extractCSS = new ExtractTextPlugin('styles.[name].[chunkhash].css');
// const extractSCSS = new ExtractTextPlugin('styles.[name]-two.[chunkhash].css');

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
        exclude: [ /node_modules/ ],
        loaders: [ 'babel-loader' ]
      },
      {
        test: /\.s?(css)$/,
        use: [
          'style-loader',
          {
            loader: "css-loader",
            query: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
              importLoaders: true,
              // sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                return [
                  postcssFocus(), // Add a :focus to every :hover
                  cssnext({ // Allow future CSS features to be used, also auto-prefixes the CSS...
                    browsers: ['last 2 versions', 'IE > 10'], // ...based on this browser list
                  }),
                  postcssReporter({ // Posts messages from plugins to the terminal
                    clearMessages: true,
                  }),
                ];
              },
            },
          },
          {
            loader: "sass-loader",
          }
          ],
      },
      // {
      //   test: /\.css$/,
      //   exclude: [/node_modules/],
      //   loaders: [
      //     'style-loader',
      //     {
      //       loader: "css-loader",
      //       query: {sourceMap: true, modules: true, importLoaders: 1, localIndentName: "[local]"}
      //     },
      //     // uncomment if you need autoprefixer in dev environment
      //     // {
      //     //   loader: "postcss"
      //     // },
      //   ]
      // },
      // {
      //   // Transform 3rd party css into an external stylesheet (vendor.[contenthash].css)
      //   test: /\.s?css$/,
      //   include: /node_modules/,
      //   use: vendorCSSLoaders,
      // },
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
    // new InlineManifestWebpackPlugin(),
    // new ManifestPlugin({}),
    // extractCSS,
    // extractSCSS,
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: '[name].js'
    }),
    // extractVendorCSSPlugin,
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackHarddiskPlugin({
      outputPath: path.resolve(__dirname, 'build/public')
    }),
    new HtmlWebpackPlugin({
      template: './src/containers/document/index.html',
      favicon: './src/containers/document/favicon.ico',
      alwaysWriteToDisk: true,
      minify: false,
      cache: false
    }),
  ]
};

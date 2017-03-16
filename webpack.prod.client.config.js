const {resolve} = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OfflinePlugin = require('offline-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ManifestPlugin = require('webpack-manifest-plugin');
const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');
const browserslist = require('./browserslist');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const extractVendorCSSPlugin = new ExtractTextPlugin({
  filename: 'vendor.[chunkhash].min.css',
  allChunks: true
});
// const extractCSS = new ExtractTextPlugin({
//   filename: '[name]-[chunkhash].min.css',
//   allChunks: true
// });
const extractSCSS = new ExtractTextPlugin({
  filename: '[name]-[chunkhash].min.css',
  ignoreOrder: true,
  allChunks: true
});
const vendorCSSLoaders = extractVendorCSSPlugin.extract({
  fallback: 'style-loader',
  use: ['style-loader', 'css-loader', 'sass-loader'],
});
const SCSSLoaders = extractSCSS.extract({
  fallback: 'style-loader',
  use: [
    {
      loader: 'css-loader',
      query: {
        modules: true,
        localIdentName: '[path][name]__[local]--[hash:base64:5]',
        importLoaders: true,
        sourceMap: true
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: () =>{
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
    'sass-loader',
  ],
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
        test: /\.s?css$/,
        exclude: [/node_modules/],
        use: SCSSLoaders
      },
      // {
      //   test: /\.css$/,
      //   use: extractCSS.extract({
      //     fallback: 'style-loader',
      //     use: 'css-loader?modules&importLoaders=1&localIndentName=[local]',
      //   })
      // },
      {
        // Transform 3rd party css into an external stylesheet (vendor.[contenthash].css)
        test: /\.s?css$/,
        include: /node_modules/,
        use: vendorCSSLoaders,
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
    extractSCSS,
    extractVendorCSSPlugin,
    new InlineManifestWebpackPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      filename: 'vendor-[chunkhash].min.js'
    }),
    new HtmlWebpackPlugin({
      template: './containers/document/index.html',
      favicon: './containers/document/favicon.ico'
    }),
    new webpack.ProvidePlugin({
      // make fetch available
      fetch: 'exports-loader?self.fetch!whatwg-fetch',
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.NormalModuleReplacementPlugin(
      /\.\/route/,
      './routeAsync'
    ),
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

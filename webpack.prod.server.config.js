const path = require('path');
const webpack = require('webpack');
const cssnext = require('postcss-cssnext');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');

// const SCSSLoaders = extractSCSS.extract({
//   fallback: 'style-loader',
//   use: [
//     {
//       loader: 'css-loader',
//       options: {
//         modules: true,
//         // localIdentName: '[local]',
//         importLoaders: true,
//         sourceMap: true
//       }
//     },
//     {
//       loader: 'postcss-loader',
//       options: {
//         plugins: () => {
//           return [
//             postcssFocus(), // Add a :focus to every :hover
//             cssnext({ // Allow future CSS features to be used, also auto-prefixes the CSS...
//               browsers: ['last 2 versions', 'IE > 10'], // ...based on this browser list
//             }),
//             postcssReporter({ // Posts messages from plugins to the terminal
//               clearMessages: true,
//             }),
//           ];
//         },
//       },
//     },
//     'sass-loader',
//   ],
// });

module.exports = {
  entry: "./src/server/index.js",
  output: {
    filename: "server.js",
    // filename: "server.min.js",
    publicPath: "/assets/",
    path: "build/public"
  },
  target: 'node',

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [ /node_modules/ ],
        use: [ 'babel-loader' ]
      },
      {
        test: /\.s?css$/,
        exclude: [ /node_modules/ ],
        use: [ 'null-loader' ]
      },
      {
        test: /\.(jpg)$/,
        exclude: [ /node_modules/ ],
        use: 'file-loader?name=images/[path][name]-[hash].[ext]&context=src'
      },
      {
        test: /\.json?$/,
        use: [ 'json-loader' ]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV:'"production"',
        HOST: '"localhost"',
        PORT: '"3030"'
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compressor: {
    //     screw_ie8: true,
    //     warnings: false
    //   }
    // })
  ]
};

const path = require('path');
const webpack = require('webpack');

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
        test: /\.(sass|css)$/,
        exclude: [ /node_modules/ ],
        use: [ 'null-loader' ]
      },
      {
        test: /\.(jpg|ico)$/,
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

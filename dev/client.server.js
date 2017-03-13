const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.client.server.config.js');

const app = new WebpackDevServer(webpack(config), {
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true,
    chunkModules: false
  },
  publicPath: '/assets/'
});

app.listen(process.env.PORT, process.env.HOST, function (err) {
  if (err){
    console.log(err);
  }

  console.log(`\n==> 🚧  Wepack-Dev-Server(${process.env.NODE_ENV}) listening at ${process.env.HOST}:${process.env.PORT}`);
});


// const webpack = require('webpack');
// const express = require('express');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');
// const config = require('./webpack.client.server.config');
// const handleRender = require("../src/server/handle-render");
//
// const compiler = webpack(config);
// const app = express();
//
// const devMiddleware = webpackDevMiddleware(compiler, {
//   hot: true,
//   historyApiFallback: true,
//   stats: {
//     colors: true,
//     chunkModules: false
//   },
//   publicPath: '/assets/'
// });
//
// app.use(webpackHotMiddleware(compiler));
// app.use(devMiddleware);
//
//
// app.get('*', (req, res) => {
//   // Here is it! Get the index.html from the fileSystem
//   const htmlBuffer = devMiddleware.fileSystem.readFileSync(`${config.output.path}/index.html`);
//   app.get('*', function(req, res){
//     handleRender(htmlBuffer.toString(),req,res)
//   });
// });
//
// app.listen(8080, 'localhost');
//

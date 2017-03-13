import React from 'react'
import dot from 'dot';
import { renderToString, renderToStaticMarkup } from "react-dom/server"
import { StaticRouter } from 'react-router'
import Helmet from "react-helmet"
const fs = require('fs');
// const baseTemplate = fs.readFileSync('./build/public/index.html');
// const template = dot.template(baseTemplate);
import App from "../containers/App"
import Document from "../containers/document/index"

const handleRender = (req, res) => {
  // This context object contains the results of the render
  const context = {};
  console.log('first');
  // render the first time
  let markup = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App/>
    </StaticRouter>
  );
  console.log('context = ', context);
  // context.url will contain the URL to redirect to if a <Redirect> was used
  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    });
    res.end()
  } else {
    // the result will tell you if there were any misses, if so
    // we can send a 404 and then do a second render pass with
    // the context to clue the <Miss> components into rendering
    // this time (on the client they know from componentDidMount)
    if (context.missed) {
      res.writeHead(404);
      markup = renderToString(
        <StaticRouter location={req.url} context={context}>
          <App/>
        </StaticRouter>
      )
    }
    Helmet.rewind();
    console.log('after rewind');
    res.writeHead(200);
    res.write('<!DOCTYPE html>' + renderToStaticMarkup(<Document head={Helmet.rewind()} content={markup} />));
    // res.write(template({body: body}));
    res.end()
  }
};

export default handleRender

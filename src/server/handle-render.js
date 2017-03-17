import React from 'react';
import dot from 'dot';
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from 'react-router';
import Helmet from 'react-helmet';
import configureStore from '../store';
import createHistory from 'history/createMemoryHistory';
const fs = require('fs');
let index = process.env.NODE_ENV === 'production' ? './build/public/index.html' : './dev/build/public/index.html';
import rootReducer from '../reducers/index'
const baseTemplate = fs.readFileSync(index);
const template = dot.template(baseTemplate);
import Root from "../Root"
import App from "../App"

const handleRender = (req, res) => {
  // This context object contains the results of the render
  const staticHistory = createHistory(req.url);
  const context = {};
  // render the first time
  // const staticRouter = new StaticRouter();
  // staticRouter.props = { location: req.url, context: {}, basename: '' };
  // const { props: { history: staticHistory } } = staticRouter.render();
  console.log(staticHistory);
  const store = configureStore({}, staticHistory);
  let body = renderToString(
    <Root store={store} history={staticHistory} />
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
      body = renderToString(
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      )
    }
    Helmet.rewind();
    // const styles = styleSheet.rules().map(rule => rule.cssText).join('\n');
    res.writeHead(200);
    let text = template({body: body});
    console.log(text);
    res.write(text);
    res.end()
  }
};

export default handleRender;

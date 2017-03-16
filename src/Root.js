import React from 'react'
import { ConnectedRouter } from 'react-router-redux'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import configureStore from './store'
import App from './App'

const history = createHistory();

const store = configureStore({}, history);
// render the first time
const Root = () => (
  <BrowserRouter>
    <Provider store={store}>
        <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </BrowserRouter>
);

export default Root

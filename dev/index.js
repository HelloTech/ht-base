import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { ConnectedRouter, routerMiddleware, connectRouter, push } from 'connected-react-router/immutable'
import configureStore from '../src/store'
import { AppContainer } from 'react-hot-loader'
import Root from '../src/Root'
const history = createBrowserHistory();
console.log(history);
const store = configureStore({}, history);
const render = () => {
  ReactDOM.render(
    <AppContainer>
        <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('app')
  )
};

render();

if (module.hot){
  module.hot.accept('../src/Root', () =>{
    render()
  });
}

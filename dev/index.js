import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import configureStore from '../src/store'
import { AppContainer } from 'react-hot-loader'
import Root from '../src/Root'
const history = createHistory();

const store = configureStore({}, history);

console.log(store);

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} history={history} />
    </AppContainer>,
    document.getElementById('app')
  )
};

render(Root);

if (module.hot){
  module.hot.accept('../src/Root', () =>{
    render(Root)
  })
}


import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
// import createHistory from 'history/createBrowserHistory'
import Immutable from 'immutable'
import { ConnectedRouter, routerMiddleware, connectRouter, push } from 'connected-react-router/immutable'
import configureStore from '../src/store'
import rootReducer from '../src/reducers/index'
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
//
// import { AppContainer } from 'react-hot-loader'
// import { applyMiddleware, compose, createStore } from 'redux'
// import { createBrowserHistory } from 'history'
// import { routerMiddleware, connectRouter } from 'connected-react-router/immutable'
// import { Provider } from 'react-redux'
// import Immutable from 'immutable'
// import React from 'react'
// import ReactDOM from 'react-dom'
// import App from '../src/Root'
// import rootReducer from '../src/reducers/index'
//
// const history = createBrowserHistory();
// console.log('-----------', history);
// const initialState = Immutable.Map();
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   connectRouter(history)(rootReducer),
//   initialState,
//   compose(
//     applyMiddleware(
//       routerMiddleware(history),
//     ),
//   ),
// );
// console.log(store);
// console.log(history);
//
// const render = () => {
//   ReactDOM.render(
//     <AppContainer>
//       <Provider store={store}>
//         <App history={history} />
//       </Provider>
//     </AppContainer>,
//     document.getElementById('app')
//   )
// }
//
// render()
//
// // Hot reloading
// if (module.hot) {
//   // Reload components
//   module.hot.accept('../src/Root', () => {
//     render()
//   })
//
//   // Reload reducers
//   module.hot.accept('../src/reducers/index', () => {
//     store.replaceReducer(connectRouter(history)(rootReducer))
//   })
// }

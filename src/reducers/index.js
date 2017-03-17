/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */
import {LOCATION_CHANGE} from 'react-router-redux';
import { ConnectedRouter, routerMiddleware, connectRouter } from 'connected-react-router/immutable';
import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { NEW_ROUTE_SCHEMA } from '../constants/common';
import { UPDATE_AUTH, USER_LOADED } from '../containers/App/constants';

import components from './components';
import entities from './entities';
import pages from './pages';

const routeSchemaInitialState = fromJS({
  skuCategories: [],
});


function routeSchemaReducer(state = routeSchemaInitialState, action) {
  switch (action.type) {
    case NEW_ROUTE_SCHEMA:
      return state.set(action.namespace, fromJS(action.routes));
    default:
      return state;
  }
}

const authReducerInitialState = fromJS({
  cookie: null,
  authToken: null,
  formAuthenticityToken: null,
});

function authReducer(state = authReducerInitialState, action) {
  switch (action.type) {
    case UPDATE_AUTH:
      return state.merge(action.auth);
    case USER_LOADED:
      return state.merge({
        authToken: action.user.authToken,
        formAuthenticityToken: action.user.formAuthenticityToken,
      });
    default:
      return state;
  }
}


function userReducer(state = null, action) {
  switch (action.type) {
    case USER_LOADED:
      return fromJS(action.user);
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
// export default function createReducer(asyncReducers) {
//   return combineReducers({
//     // router: routerReducer,
//     user: userReducer,
//     auth: authReducer,
//     routesSchema: routeSchemaReducer,
//     components: components(),
//     entities: entities(),
//     pages: pages(),
//     // ...asyncReducers,
//   });
// }

const rootReducer = combineReducers({
  user: userReducer
});
export default rootReducer;

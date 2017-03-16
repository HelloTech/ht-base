import { combineReducers } from 'redux-immutable';
import plansReducer from './plans';

export default () => {
  return combineReducers({ plans: plansReducer });
};

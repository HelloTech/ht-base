import { combineReducers } from 'redux-immutable';
import planPage from '../containers/PlanPage/reducer';

export default () => {
  return combineReducers({
    plan: planPage,
  });
};

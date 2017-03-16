import { fromJS } from 'immutable';
import { PLANS_LOADED } from '../../containers/PlansPage/constants';

const plansInitialState = fromJS({
  list: [],
});

export default function plansReducer(state = plansInitialState, action) {
  switch (action.type) {
    case PLANS_LOADED:
      return state.merge({ list: action.payload.plans });
    default:
      return state;
  }
}

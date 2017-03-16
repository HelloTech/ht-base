import { fromJS } from 'immutable';
import { PLAN_LOADED, LOAD_PLAN } from './constants';

const planPageInitialState = fromJS({
  plan: null,
});

export default function plansReducer(state = planPageInitialState, action) {
  switch (action.type) {
    case LOAD_PLAN:
      return state.merge({ plan: null });
    case PLAN_LOADED:
      return state.merge({ plan: action.payload.plan });
    default:
      return state;
  }
}

import { LOAD_PLANS, PLANS_LOADED } from './constants';

export function loadPlans() {
  return {
    type: LOAD_PLANS,
  };
}

export function plansLoaded(plans) {
  return {
    type: PLANS_LOADED,
    payload: { plans },
  };
}

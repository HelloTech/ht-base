import { LOAD_PLAN, PLAN_LOADED } from './constants';

export function loadPlan(name) {
  return {
    type: LOAD_PLAN,
    payload: { name },
  };
}

export function planLoaded(plan) {
  return {
    type: PLAN_LOADED,
    payload: { plan },
  };
}

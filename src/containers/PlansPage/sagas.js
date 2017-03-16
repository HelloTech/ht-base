import { call, put, takeEvery } from 'redux-saga/effects';
import { displayErrors, requestStarted, requestFinished } from 'utils/request';
import { selectRoutes } from '../../apiRoutes';
import { plansLoaded } from './actions';
import { LOAD_PLANS } from './constants';

export function* loadPlansFlowSaga() {
  const routes = yield call(selectRoutes);
  yield put(requestStarted());
  const response = yield call(routes.plans.list);

  yield put(requestFinished());
  if (response.err) {
    yield put(displayErrors(response));
  } else {
    const { plans } = response.data;
    yield put(plansLoaded(plans));
  }
}

export function* plansFlow() {
  yield takeEvery(LOAD_PLANS, loadPlansFlowSaga);
}

export default [
  plansFlow,
];

import { call, put, takeEvery } from 'redux-saga/effects';
import { displayErrors, requestStarted, requestFinished } from 'utils/request';
import { selectRoutes } from '../../apiRoutes';
import { planLoaded } from './actions';
import { LOAD_PLAN } from './constants';

export function* loadPlanFlowSaga({ payload }) {
  const { name } = payload;
  const routes = yield call(selectRoutes);
  yield put(requestStarted());
  const response = yield call(routes.plans.show, { name });

  yield put(requestFinished());
  if (response.err) {
    yield put(displayErrors(response));
  } else {
    const { plan } = response.data;
    yield put(planLoaded(plan));
  }
}

export function* planFlow() {
  yield takeEvery(LOAD_PLAN, loadPlanFlowSaga);
}

export default [
  planFlow,
];

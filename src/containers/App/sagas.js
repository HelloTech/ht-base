import { call, put, takeEvery } from 'redux-saga/effects';
import { selectRoutes } from 'apiRoutes';
import { displayErrors, requestStarted, requestFinished } from 'utils/request';
import { SOME_CONST, LOAD_USER } from './constants';
import { anotherAction, userLoaded } from './actions';

export function* someGenerator() {
  const routes = yield call(selectRoutes);
  yield put(requestStarted());
  const requestResult = yield call(routes.routes.skuCategories);
  yield put(requestFinished());

  if (!requestResult.err) {
    yield put(anotherAction());
  } else {
    yield put(displayErrors(requestResult));
  }
}

export function* loadUserSaga() {
  const routes = yield call(selectRoutes);
  yield put(requestStarted());
  const requestResult = yield call(routes.users.current);
  yield put(requestFinished());

  if (!requestResult.err) {
    const { user } = requestResult.data;
    yield put(userLoaded(user));
  } else {
    const status = requestResult.err.response.status;
    if (status === 401) {
      // do nothing, user is not logged in
    } else {
      yield put(displayErrors(requestResult));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* loadPageFlow() {
  yield takeEvery(SOME_CONST, someGenerator);
  yield takeEvery(LOAD_USER, loadUserSaga);
}

// Bootstrap sagas
export default [
  loadPageFlow,
];

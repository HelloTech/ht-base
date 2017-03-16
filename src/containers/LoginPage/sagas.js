import { call, put, takeEvery } from 'redux-saga/effects';
import { displayErrors, requestStarted, requestFinished } from 'utils/request';
import { LOGIN } from './constants';
import { updateAuth, loadUser } from '../../containers/App/actions';
import { selectRoutes } from '../../apiRoutes';

export function* loginFlowSaga({ email, password }) {
  const routes = yield call(selectRoutes);
  yield put(requestStarted());
  const requestResult = yield call(routes.users.login, {
    type: 'Client',
    email,
    password,
  });
  yield put(requestFinished());
  if (requestResult.err) {
    const status = requestResult.err.response.status;
    if (status === 401) { // not authenticated
      yield put(displayErrors(requestResult));
    } else {
      window.alert('Unknown error happened!');
    }
  } else {
    const authToken = requestResult.data.auth_token;
    yield put(updateAuth({ authToken }));
    yield put(loadUser());
  }
}

export function* loginFlow() {
  yield takeEvery(LOGIN, loginFlowSaga);
}

export default [
  loginFlow,
];

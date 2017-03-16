import {
  SOME_CONST,
  ANOTHER_CONST,
  LOAD_USER,
  USER_LOADED,
  UPDATE_AUTH,
} from './constants';

export function someAction() {
  return {
    type: SOME_CONST,
  };
}

export function anotherAction() {
  return {
    type: ANOTHER_CONST,
  };
}

export function updateAuth(auth) {
  return {
    type: UPDATE_AUTH,
    auth,
  };
}

export function loadUser() {
  return {
    type: LOAD_USER,
  };
}

export function userLoaded(user) {
  return {
    type: USER_LOADED,
    user,
  };
}

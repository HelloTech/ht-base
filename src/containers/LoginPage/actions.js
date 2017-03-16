import {
  LOGIN,
} from './constants';

export function loginUser({ email, password }) {
  return {
    type: LOGIN,
    email,
    password,
  };
}


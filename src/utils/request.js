import 'whatwg-fetch';
import { fromJS } from 'immutable';
import { newNotice } from '../components/NoticeStack/actions';
import * as commonActions from '../actions/common';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON or text from the request
 */
function parseResponse(response) {
  return response[response.status === 204 ? 'text' : 'json']();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response && response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response ? response.statusText : 'Offline');
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @param  {object} [auth] authToken and formAuthenticityToken
 *
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options = {}, auth = fromJS({})) {
  const requestOptions = Object.assign({},
    {
      credentials: 'include',
      headers: {
        cookie: auth.get('cookie'), // browser ignores this header
        'Auth-Token': auth.get('authToken', ''), // eslint-disable-line
      },
    },
    options);
  return fetch(url, requestOptions)
    .then(checkStatus)
    .then(parseResponse)
    .then((data) => {
      let dataObject = data;
      if (dataObject === '') {
        dataObject = {};
      }
      return { data: dataObject };
    })
    .catch((err) => {
      if (!err.response) {
        console.log('offline'); // eslint-disable-line
        return { err, data: {}, offline: true, status: 500 };
      }
      return err.response.json().then((data) => {
        return { err, data };
      }).catch(() => { // parse error
        return { err, data: {} };
      });
    });
}

function jsonWithBody(url, body, options, method, auth) {
  const requestOptions = Object.assign({},
    {
      credentials: 'include',
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Auth-Token': auth.get('authToken', ''),
        cookie: auth.get('cookie'), // browser ignores this header
      },
    },
    options);
  return request(url, Object.assign({
    body: JSON.stringify(Object.assign(
      {
        authenticity_token: auth.get('formAuthenticityToken', ''),
      },
      body,
    )),
  }, requestOptions));
}

export function postJson(url, body = {}, options = {}, auth = fromJS({})) {
  return jsonWithBody(url, body, options, 'POST', auth);
}

export function putJson(url, body = {}, options = {}, auth = fromJS({})) {
  return jsonWithBody(url, body, options, 'PUT', auth);
}

export function deleteJson(url, body = {}, options = {}, auth = fromJS({})) {
  return jsonWithBody(url, body, options, 'DELETE', auth);
}

export function displayErrors(requestResult) {
  if (requestResult.offline) {
    return newNotice({ type: 'error', title: 'Offline', content: 'Unavailable while you are offline!', unique: true });
  }
  const { errors } = requestResult.data;
  return newNotice({ type: 'error', title: 'Error', content: (errors ? errors.join('. ') : 'Some error occurred!') });
}

export function toQueryString(params) {
  return Object.keys(params).map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');
}

export function requestStarted(...args) {
  return commonActions.requestStarted(args);
}

export function requestFinished(...args) {
  return commonActions.requestFinished(args);
}

export function requestFailed(...args) {
  return commonActions.requestFailed(args);
}

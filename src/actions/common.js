export const REQUEST_STARTED = 'common/REQUEST_STARTED';
export const REQUEST_FINISHED = 'common/REQUEST_FINISHED';
export const REQUEST_FAILED = 'common/REQUEST_FAILED';

export function requestStarted() {
  return {
    type: REQUEST_STARTED,
  };
}

export function requestFinished() {
  return {
    type: REQUEST_FINISHED,
  };
}

export function requestFailed() {
  return {
    type: REQUEST_FAILED,
  };
}

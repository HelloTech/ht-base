import {
  NEW_NOTICE,
  REMOVE_NOTICE,
} from './constants';

export function newNotice(notice) {
  return {
    type: NEW_NOTICE,
    notice,
  };
}

export function removeNotice(noticeId) {
  return {
    type: REMOVE_NOTICE,
    noticeId,
  };
}

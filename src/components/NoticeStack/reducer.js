import { fromJS } from 'immutable';

import {
  NEW_NOTICE,
  REMOVE_NOTICE,
} from './constants';

const initialState = fromJS({
  notices: [],
  noticeId: 0,
});

function noticeStackReducer(state = initialState, action) {
  let existingId;
  switch (action.type) {
    case NEW_NOTICE:
      if (action.notice.unique) {
        if (state.get('notices').find((n) => n.get('content') === action.notice.content)) {
          return state;
        }
      }
      existingId = state.get('noticeId');
      return state.set('noticeId', existingId + 1).updateIn(['notices'], (ns) => ns.push(fromJS(action.notice).merge({ noticeId: existingId })));
    case REMOVE_NOTICE:
      return state.updateIn(['notices'], (ns) => ns.filter((n) => n.get('noticeId') !== action.noticeId));
    default:
      return state;
  }
}

export default noticeStackReducer;

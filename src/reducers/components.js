import { combineReducers } from 'redux-immutable';
import noticeStack from '../components/NoticeStack/reducer';
import sidebar from '../components/Sidebar/reducer';
export default () => {
  return combineReducers({
    noticeStack,
    sidebar,
  });
};

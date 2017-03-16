import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { NEW_ROUTE_SCHEMA } from '../../constants/common';
import { USER_LOADED } from '../../containers/App/constants';
import {
  DEFAULT_SUB_ITEMS,
  DEFAULT_HEADER_SUB_ITEM,
  MAIN_PLAN_ITEM,
  ITEM_CLICKED,
  TOGGLE_SIDEBAR,
  HIDE_PREVIEW,
} from './constants';

const initialState = fromJS({
  open: false,
  preview: true,
  mainItems: [
    MAIN_PLAN_ITEM,
  ],
  headerSubItem: DEFAULT_HEADER_SUB_ITEM,
  defaultHeaderSubItem: DEFAULT_HEADER_SUB_ITEM,
  subItems: DEFAULT_SUB_ITEMS,
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case NEW_ROUTE_SCHEMA: {
      if (action.namespace !== 'skuCategories') {
        return state;
      }
      return state.set('mainItems', fromJS([...action.routes, MAIN_PLAN_ITEM]));
    }
    case LOCATION_CHANGE: {
      const link = action.payload.pathname;
      const newState = state.asMutable();
      let currentMainItem = null;
      newState.set('preview', true);
      newState.set('open', false);
      newState.get('mainItems').forEach((mainItem, index) => {
        if (mainItem.get('link')) {
          newState.setIn(['mainItems', index, 'active'], mainItem.get('link') === link);
          if (mainItem.get('link') === link) {
            currentMainItem = mainItem;
          }
        } else {
          let subItemHasLink = false;
          mainItem.get('subItems').forEach((subItem) => {
            if (subItem.get('link') === link) {
              subItemHasLink = true;
              currentMainItem = mainItem;
            }
          });
          newState.setIn(['mainItems', index, 'active'], subItemHasLink);
        }
      });
      newState.set('subItems', (currentMainItem && currentMainItem.get('subItems')) || fromJS(DEFAULT_SUB_ITEMS));
      newState.get('subItems').forEach((subItem, index) => {
        newState.setIn(['subItems', index, 'active'], subItem.get('link') === link);
      });
      return newState.asImmutable();
    }
    case ITEM_CLICKED: {
      if (action.item.get('link')) {
        return state;
      }
      const newState = state.asMutable();
      newState.get('mainItems').forEach((mainItem, index) => {
        newState.setIn(['mainItems', index, 'active'], mainItem.get('name') === action.item.get('name'));
      });
      newState.set('open', true);
      newState.set('subItems', action.item.get('subItems'));
      newState.set('headerSubItem', action.item.get('headerSubItem'));
      return newState.asImmutable();
    }
    case USER_LOADED: {
      let newState = state.merge({
        defaultHeaderSubItem: {
          name: action.user.name,
          link: '/login',
        },
      });
      if (DEFAULT_HEADER_SUB_ITEM.name === state.getIn(['headerSubItem', 'name'])) {
        newState = newState.set('headerSubItem', state.get('defaultHeaderSubItem'));
      }
      return newState;
    }
    case TOGGLE_SIDEBAR: {
      return state.merge({
        open: !state.get('open'),
        headerSubItem: state.get('defaultHeaderSubItem'),
        subItems: DEFAULT_SUB_ITEMS,
      });
    }
    case HIDE_PREVIEW: {
      return state.set('preview', false);
    }
    default: {
      return state;
    }
  }
}

export default reducer;

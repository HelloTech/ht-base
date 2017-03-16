import {
  ITEM_CLICKED,
  TOGGLE_SIDEBAR,
  HIDE_PREVIEW,
} from './constants';

export function itemClicked(item) {
  return {
    type: ITEM_CLICKED,
    item,
  };
}

export function toggleSidebar() {
  return {
    type: TOGGLE_SIDEBAR,
  };
}

export function hidePreview() {
  return {
    type: HIDE_PREVIEW,
  };
}


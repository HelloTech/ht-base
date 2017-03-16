/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const SOME_CONST = 'some_const';
export const ANOTHER_CONST = 'another_const';
export const UPDATE_AUTH = 'app/update_auth';
export const LOAD_USER = 'app/load_user';
export const USER_LOADED = 'app/user_loaded';

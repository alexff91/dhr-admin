import { axios, storage } from '../utils';

export const CHANGE_SESSION = (state, session) => {
  if (session && session.token) {
    // change axios authorization header
    axios.defaults.headers.Authorization = `Bearer ${session.token}`;
  }
  // TODO: new session mixin
  Object.assign(state.session, session);
  storage.set('session_info', state.session);
};

export const TOGGLE_SIDEBAR_COLLAPSE = state => {
  state.sidebar.collapse = !state.sidebar.collapse;
  storage.set('sidebar_collapse', state.sidebar.collapse);
};

export const CHANGE_USER = (state, user) => {
  state.user = user;
  storage.set('user', state.user);
};

export const CHANGE_COMPANY = (state, company) => {
  state.company = company;
  storage.set('company', state.company);
};
import { axios, storage } from '../utils';

const state = {
  session: storage.get('session_info') || {},
  user: storage.get('user') || null,
  company: storage.get('company') || null
};

if (state.session && state.session.token) {
  axios.defaults.headers.Authorization = `Bearer ${state.session.token}`;
}

export default state;

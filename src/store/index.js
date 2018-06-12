import Vue from 'vue';
import Vuex from 'vuex';

import state from './state';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';
import * as modules from './modules';

Vue.use(Vuex);

const strict = process.env.NODE_ENV !== 'production';

const plugins = [];

const store = new Vuex.Store({state, getters, mutations, actions, modules, strict, plugins});

// ## Initial
// store.dispatch('initToken')
// // change axios authorization header
// axios.defaults.headers.Authorization = `Bearer ${storage.get('wedn_net_access_token')}`

// ## Hot module replacement
if (module.hot) {
  module.hot.accept([
    './getters',
    './mutations',
    './actions',
    './modules/vacancies'
  ], () => {
    store.hotUpdate({
      getters: require('./getters'),
      mutations: require('./mutations'),
      actions: require('./actions'),
      modules: {
        vacancies: require('./modules/vacancies')
      }
    });
  });
}

export default store;

// // accept first param must be literal !!!
// if (module.hot) {
//   const accepts = [
//     './getters',
//     './mutations',
//     './actions'
//   ]
//   module.hot.accept(accepts, () => {
//     store.hotUpdate({
//       getters: require('./getters'),
//       mutations: require('./mutations'),
//       actions: require('./actions')
//     })
//   })
// }

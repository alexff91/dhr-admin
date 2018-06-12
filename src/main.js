/* eslint-disable */
import Vue from 'vue';
import App from './app.vue';
import { sync } from 'vuex-router-sync';
import router from './router';
import store from './store';
import VueAnalytics from 'vue-analytics';
import plugins from './plugins';
import wysiwyg from 'vue-wysiwyg';
import { Badge, Button, Col, Form, FormItem, Input, Menu, MenuItem, MenuItemGroup, Row, Submenu } from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import 'vue-wysiwyg/dist/vueWysiwyg.css';
import '../src/assets/styles/main.scss';

Vue.use(wysiwyg, {});

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(Col);
Vue.use(Row);
Vue.use(MenuItemGroup);
Vue.use(Badge);

Vue.use(plugins);
sync(store, router, {moduleName: 'route'});

Vue.config.debug = process.env.NODE_ENV === 'development';
Vue.config.silent = process.env.NODE_ENV === 'production';
Vue.config.devtools = true;
Vue.config.productionTip = false;

Vue.use(VueAnalytics, {
  id: 'UA-120569683-2',
  router
});

new Vue({
  render: h => h(App),
  store: store,
  router: router
}).$mount('#app');

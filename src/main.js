/* eslint-disable */
import Vue from 'vue';
import App from './app.vue';
import {sync} from 'vuex-router-sync';
import router from './router';
import store from './store';
import VueAnalytics from 'vue-analytics';
import plugins from './plugins';
import VEditor from 'yimo-vue-editor'
import Vuikit from 'vuikit';
import VuikitIcons from '@vuikit/icons';
import VueClipboard from 'vue-clipboard2';
// import '@vuikit/theme';
import {
    Alert,
    Badge,
    Button,
    Col,
    Form,
    FormItem,
    Icon,
    Input,
    Link,
    Menu,
    MenuItem,
    MenuItemGroup,
    Option,
    Rate,
    Row,
    Select,
    Step,
    Steps,
    Submenu,
    TabPane,
    Tabs,
    Tooltip,
} from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import '../src/assets/styles/main.scss';

import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';

Vue.use(Toast);
Vue.use(VueClipboard);
Vue.use(VEditor, {
    name: 'v-editor-app',
    config: {},
});
Vue.use(Vuikit);
Vue.use(VuikitIcons);

Vue.use(Form);
Vue.use(Link);
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
Vue.use(Alert);
Vue.use(Tooltip);
Vue.use(Select);
Vue.use(Option);
Vue.use(Rate);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Icon);

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

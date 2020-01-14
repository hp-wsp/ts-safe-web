import Vue from 'vue'
import moment from 'moment'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/icon/iconfont.css';
import axios from 'axios'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import storageHelper from './utils/storageHelper';
import './static/element-reset.css';

Vue.use(ElementUI);

import filterHelper from "./utils/filterHelper";

Object.keys(filterHelper).forEach(key => Vue.filter(key, filterHelper[key]));

// import photo from './components/photo/index.js';
// Vue.use(photo);

Vue.config.productionTip = false;
Vue.prototype.$baseURL = axios.defaults.baseURL;

import {get, post, dele, put} from './utils/serviceHelper'

Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$put = put;
Vue.prototype.$dele = dele;


router.beforeEach((to, from, next) => {
    let mToken = storageHelper.get('token');
    if (mToken) {
        next();
    } else {
        if (to.path == '/') {
            next();
        } else {
            next('/');
        }
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

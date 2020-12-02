import '@babel/polyfill';
import Vue from 'vue';
import '@/scripts/vant.js';
import 'vant/lib/index.css';

import App from './App.vue';
import router from '@/router/index.js';
import store from '@/store/index.js';

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

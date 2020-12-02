import Vue from 'vue';
import Router from 'vue-router';
import {
  siteName
} from '@/scripts/config';
import Layout from '@/views/layout.vue';
import Preview from '@/views/preview.vue';
import Show from '@/views/show.vue';

Vue.use(Router);

const VueRouter = new Router({
  mode: 'history',
  scrollBehavior: () => ({
    x: 0,
    y: 0
  }),
  routes: [
    {
      path: '/',
      component: Layout,
    },
    {
      path: '/preview',
      component: Preview,
    },
    {
      path: '/show',
      component: Show,
    }
  ]
});

VueRouter.beforeEach((to, from, next) => {
  next();
});

VueRouter.afterEach((to) => {
  // 修改页面title
  let title = to.meta.title ?
    to.meta.title :
    siteName;
  document.title = title;
});

export default VueRouter;

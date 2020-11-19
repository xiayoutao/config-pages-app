// import Vue from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import {
  siteName
} from '@/constants';

import Preview from '@/views/preview.vue';
import Show from '@/views/show.vue';
// const Layout = () => import('@/views/layout.vue');
// const importPage = view => () => import(`@/views/${view}.vue`);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/show',
    },
    {
      path: '/preview',
      // component: importPage('preview'),
      component: Preview,
    },
    {
      path: '/show',
      // component: importPage('show'),
      component: Show,
    }
  ]
});

router.beforeEach((to, from, next) => {
  next();
});

router.afterEach((to) => {
  // 修改页面title
  document.title = to.meta.title ? to.meta.title : siteName;
});

export default router;

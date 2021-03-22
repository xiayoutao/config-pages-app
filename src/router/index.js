import { createRouter, createWebHistory } from 'vue-router';
import { siteName } from '@/common/constants';

const importPage = view => () => import(`@/views/${view}.vue`);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/preview',
      component: importPage('preview'),
    },
    {
      path: '/show',
      component: importPage('show'),
    },
    {
      path: '/panorama',
      component: importPage('panorama'),
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

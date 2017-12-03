import Vue from 'vue';
import Router from 'vue-router';
import YesNo from '@/components/YesNo';
import VueInfo from '@/components/VueInfo';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { name: 'YesNo' },
    },
    {
      path: '/yesno',
      name: 'YesNo',
      component: YesNo,
    },
    {
      path: '/vue',
      name: 'VueInfo',
      component: VueInfo,
    },
  ],
});

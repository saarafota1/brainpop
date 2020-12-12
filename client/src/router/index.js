import Vue from 'vue';
import VueRouter from 'vue-router';
import TimeLine from '../views/Activities.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/v1',
    name: 'timeline',
    component: TimeLine,
  },
  {
    path: '/:version',
    name: 'timeline version',
    component: TimeLine,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

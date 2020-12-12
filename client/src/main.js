import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(require('vue-moment'));

Vue.filter('numberToMonth', (value) => {
  if (!value) return 'xxx';
  if (value - 1 < 0 || value - 1 > 11) return 'xxx';
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  return months[value - 1];
});
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

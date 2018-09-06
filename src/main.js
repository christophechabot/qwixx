import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './registerServiceWorker'

import VuexHistory from './history';

Vue.use(VuexHistory);

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
  created() {
    this.$store.commit('emptySheet');
  }
}).$mount('#app')

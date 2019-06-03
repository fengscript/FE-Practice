import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import _ from './helpers.js'
Object.defineProperty(Vue.prototype, '$_', { value: _ });

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import Test from './Test.vue'
import store from './store'

new Vue({
  el: '#app',
  store,
  // render: h => h(Test)
  render:function (app) { 
    return app(App);
   }
})
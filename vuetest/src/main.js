import Vue from 'vue'
import App from './App.vue'
import Test from './Test.vue'
import Store from './store'

new Vue({
  el: '#app',
  store:Store,
  // render: h => h(Test)
  render:function (app) { 
    return app(Test);
   }
})
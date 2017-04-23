import Vue from 'vue'
import App from './App.vue'
import Test from './Test.vue'

new Vue({
  el: '#app',
  // render: h => h(Test)
  render:function (app) { 
    return app(Test);
   }
})
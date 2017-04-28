import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store=new Vuex.Store({
  state:{
    count:0
  },
  mutations:{
    inc:state => state.count++,
    dec:state => state.count--
  }
})

export default store
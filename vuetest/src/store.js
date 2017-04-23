import Vuex from 'vuex'


const store=new Vuex.Store({
  state:{
    count:0
  },
  mutataions:{
    inc:state => state.count++,
    dec:state => state.count--
  }
})

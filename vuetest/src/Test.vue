<template>
    <div class="root">
        <h1>TEST</h1>
        <div id="container">
            {{count}}
            <button @click ="inc">+</button>
            <button @click ="dec">-</button>
        </div>
    </div>
</template>
<script>
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
// const Counter = {
//     template:`<div>{{count}}</div>`,
//     computed: {
//         count(){
//             return store.count
//         }
//     }
// }

    export default{
        name:'test',
        data () {
            return {
                
            }
        },
        computed: {
            count(){
                return store.state.count
            }
            // count => store.state.count
        },
        methods:{
            inc(){
                store.commit('inc')
            },
            dec(){
                store.commit('dec')
            }
        }
    }
</script>
<style>
    h1{font-size: 24px}
</style>
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
import store from './store.js'

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
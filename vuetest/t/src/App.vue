<template>
  <div id="app">
    <img src="./assets/logo.png">

    <Test subComponent="fuck"></Test>
    <input type="text" v-model="input">
    <router-link to="/foo">Tab1</router-link>
    <router-link to="/bar">Tab2</router-link>
    <br>
    <br>
    <router-view></router-view>

    <!-- <user-info v-bind:users="users">{{users}}</user-info> -->
    <button-counter></button-counter>
    <!-- <formArea></formArea> -->
  </div>
</template>

<script>
import Test from "./Test.vue";
import Vue from "vue";

Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})

export default {
  name: "app",
  components: {
    Test,
    // 'button-counter':'button-counter',
    // componentTest,
    // 'test-template':'test-template',
    // "user-info": "user-info"
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      users: ["Hi", "Hello", "AUOK"],
      input:'',
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

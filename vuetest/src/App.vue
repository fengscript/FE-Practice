<template>
  <div id="app">
    <img src="./assets/logo.png">

    <Test />
    <router-link to="/foo">Tab1</router-link>
    <router-link to="/bar">Tab2</router-link>

    <br>
    <br>
    <router-view></router-view>

    <user-info v-bind:users="users">{{users}}</user-info>
    <componentTest></componentTest>
    <template id="componentTestTemplate">
      <div>
        <span>2</span>
        <span>1</span>
      </div>
    </template>

    <formArea></formArea>
  </div>
</template>

<script>
import Test from "./Test.vue";

const componentTest = {
  template: 'componentTestTemplate'
};

export default {
  name: "app",
  // template: {
  //   Test
  // },
  components: {
    Test,
    componentTest,
    "user-info": "user-info"
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      users: ["Hi", "Hello", "AUOK"]
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

<template>
  <div>
    <li
      v-for="item in users"
      :key='item.id'
    >{{item.text}}</li>
    <input
      @input='inputToEmit'
      type="text"
      placeholder="input to emit event"
    >
  </div>
</template>

<script>
import _ from "../helpers.js";

export default {
  name: "List",
  data() {
    return {};
  },
  props: {
    users: Array
  },
  methods: {
    inputToEmit: _.debounce(function(e) {
      this.$emit("sendInput", e.target.value);
      console.log(e.target.value);
    }, 500)
  }
};
</script>

<style scoped>
</style>
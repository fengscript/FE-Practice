<template>
  <div>
    <li
      v-for="item in users"
      :key='item.id'
      :style={color:colorCache}
    >{{item.text}}</li>
    <input
      @input='inputToEmit'
      type="text"
      placeholder="input to emit event"
    >
    <button @click='switchColor'>Switch Color</button>
  </div>
</template>

<script>
import _ from "../helpers.js";

export default {
  name: "List",
  data() {
    return {
      colors: ["#515bd4", "#8134af", "#dd2a7b", "#feda77"],
      colorCache: ""
    };
  },
  props: {
    users: Array
  },
  methods: {
    switchColor() {
      this.colorCache = this.colors[_.getRandom(0, this.colors.length - 1)];
    },
    inputToEmit: _.debounce(function(e) {
      this.$emit("sendInput", e.target.value);
    }, 500)
  }
};
</script>

<style scoped>
</style>
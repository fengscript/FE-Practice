<template>
  <div>
    <h3>Welcome! <span class="user-name"> {{this.$route.params.username}} </span> </h3>

    <button
      @click="pageReturn"
      :style=styleBlock
    >Return</button>

    <router-link to='./UserDetail'>Detail 1</router-link>   |
    <router-link to='./UserDetail'>Detail 2</router-link>
    <router-view id="user-detail"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      styleBlock: "display:block;margin:20px auto"
    };
  },
  methods: {
    pageReturn() {
      this.$router.back();
    }
  },
  component: {}
};
</script>

<style>
.user-name {
  color: #845ec2;
}
#user-detail {
  margin: 20px auto;
  border: 2px solid #845123;
}
</style>
<template>
  <div>
    <h3>Welcome! <span class="user-name"> {{this.$route.params.username}} </span> </h3>

    <button
      @click="pageReturn"
      :style=styleBlock
    >Return</button>

    <router-link to='/users/username/userDetail'>Detail 1</router-link> |
    <router-link to='/users/username/userDetail2'>Detail 2</router-link>

    <router-view id="user-detail"></router-view>
  </div>
</template>

<script>
// import UserDetail from "./views/UserDetail.vue";

export default {
  data() {
    return {
      styleBlock: "display:block;margin:20px auto"
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    pageReturn() {
      this.$router.back();
    },
    fetchData() {
      console.log("fetch data start");
      fetch("http://localhost:3000/contents", {
        method: "GET"
      })
        .then(response => response.json())
        .then(response => console.log("Success:", JSON.stringify(response)));
    }
  },
  components: {
    // UserDetail
  }
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
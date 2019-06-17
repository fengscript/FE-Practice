<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h3>Get Info From server by Vuex</h3>
    <div>{{preRender}}</div>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      preRender: "Get info now..."
    };
  },
  mounted() {
    this.$store
      .dispatch("fetchPersonData")
      .then(data => {
        console.log(data);
      });

    // const persons = this.$store.getters.getPerson();
  },
  props: {},
  components: {},
  methods: {}
};
</script>

<style>
</style>

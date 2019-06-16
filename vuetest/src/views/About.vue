<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h3>Get Info From server by Vuex</h3>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {};
  },
  mounted(){
    this.$store.dispatch('fetchPersonData')


    // const persons = this.$store.getters.getPerson();
    
    setTimeout(() => {
      console.log(this.$store.getters.getPerson)
    }, 1000)
  },
  props: {},
  components: {},
  methods: {}
};
</script>

<style>
</style>

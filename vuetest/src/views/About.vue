<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h3>Get Info From server by Vuex</h3>
    <div>{{preRender}}</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "About",
  data() {
    return {
      preRender: "Get info now..."
    };
  },
  computed: {
    ...mapGetters(["getPersons"])
  },
  watch: {
    getPersons(data) {
      if (this.preRender) {
        this.preRender = this.getPersons;
        console.log(this.getPersons);
      }
    }
  },
  created() {},
  beforeMount() {},
  mounted() {
    this.$store.dispatch("fetchPersonData");
  },
  props: {},
  components: {},
  methods: {}
};
</script>

<style>
</style>

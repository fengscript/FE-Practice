<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h3>Get Info From server by Vuex</h3>
    <div>{{preRender}}</div>

    <button @click='hook'>Click</button>
    <son @sonToFather='evtFromSon'></son>

    -------------
    <br>
    <h3>Slot test</h3>
    <slotTestComponent>
      <img src="../assets/logo.png" alt="logo">
    </slotTestComponent>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

const son = {
  template: `
  <div>
   <button :value = 'value' @click='add'>son Click 1</button>
    <button  @click='son2'>son Click 2</button>
    <button  @click='son3'>son Click 3</button>
  </div>
  `,
  data() {
    return {
      value: 0
    };
  },
  methods: {
    add() {
      this.value++;
      console.log(this.value);
      this.$parent.hook();
    },
    son2() {
      console.log("son send msg to father");
      this.$emit("sonToFather");
    },
    son3() {}
  }
};

const slotTestComponent = {
  template: `
          <div>
            <h5>Some info head</h5>
            <slot></slot>
            <h5>Some info footer</h5> 
          </div>
            `,
  data() {
    return {};
  },
  methods: {}
};

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
    getPersons() {
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
  components: {
    son: son,
    slotTestComponent: slotTestComponent
  },
  methods: {
    hook() {
      console.log("click father button");
    },
    evtFromSon() {
      console.log("evt From Son");
    }
  }
};
</script>

<style>
</style>

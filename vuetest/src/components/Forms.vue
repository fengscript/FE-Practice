<template>
  <div>
    <form action="get">
      <div>
        <h3>Radio - {{radio}}</h3>
        <input
          type="radio"
          name="gender"
          value="gerder-man"
          id="gerder-man"
          v-model="radio"
        >
        <label for="gerder-man">Man</label>
        <input
          type="radio"
          name="gender"
          value="gerder-women"
          id="gerder-women"
          v-model="radio"
        >
        <label for="gerder-women">Women</label>
      </div>
      <div>
        <h3>Checkbox - {{checkbox}} - checkboxSingle:{{checkboxSingle}}</h3>
        <input
          type="checkbox"
          name="extra"
          value="64G"
          id="extra-storage"
          v-model="checkbox"
        >
        <label for="extra-storage">64G</label>
        <input
          type="checkbox"
          name="extra-storage"
          value="4000mah"
          id="extra-battery"
          v-model="checkbox"
        >
        <label for="extra-battery">4000mah</label>
        <input
          type="checkbox"
          name="extra-single"
          value="single - ''"
          id="extra-single"
          v-model="checkboxSingle"
        >
        <label for="extra-single">Single checkbox - with true/false</label>
      </div>

      <div>
        <h3>Select - {{select}}</h3>
        <select
          name="select-version"
          id="select"
          v-model="select"
        >
          <option
            disabled
            value=""
          >请选择</option>
          <option value="v1">v1</option>
          <option value="v2">v2</option>
          <option value="v3">v3</option>
        </select>
      </div>

      <div>
        <h3>Dynamic v-for/select - {{dynamicSelect}}</h3>
        <select
          name="dynamicSelect"
          id="dynamicSelect"
          v-model="dynamicSelect"
        >
          <option
            disabled
            value=""
          >请选择</option>
          <option
            v-for="(item,index) in options"
            :key='index'
            :value=item.value
          >{{item.text}}</option>
        </select>
        <button
          @click="TEST"
          type="button"
        >TEST</button>
      </div>

    </form>
    <div>
      <br>
      <br>
      <h3>Vuex test</h3>
      <input
        v-model="vuexName"
        type="text"
        placeholder="Input name"
      >
      <input
        v-model="vuexValue"
        type="text"
        placeholder="Input value"
      >
      <button
        @click='formAdd'
        type="button"
      >Add</button>
      <button
        @click='formRemove'
        type="button"
      >Remove</button>
      <div class="input-show">{{getItems}}</div>
      <div class="input-show">length : {{getLength}}</div>
    </div>
  </div>
</template>

<script>
import { mapState,mapGetters } from "vuex";

export default {
  name: "Forms",
  data() {
    return {
      radio: "",
      checkbox: [],
      checkboxSingle: "",
      select: "",
      options: [
        { text: "One", value: "A" },
        { text: "Two", value: "B" },
        { text: "Three", value: "C" }
      ],
      dynamicSelect: "A",
      vuexName: "",
      vuexValue: ""
    };
  },
  computed: {
    ...mapGetters(["getLength", "getItems"]),
    ...mapState({
      t: state => state.t
    })
    // getLength() {
    //   return this.$store.getters.getLength;
    // }
  },
  methods: {
    TEST() {},
    formClear() {
      this.vuexName = "";
      this.vuexValue = "";
    },
    formAdd() {
      this.$store.commit("add", {
        name: this.vuexName,
        value: this.vuexValue
      });
      this.formClear();
    },
    formRemove() {
      this.$store.commit("remove", {
        name: this.vuexName
      });
      this.formClear();
    }
  }
};
</script>

<style scoped>
.input-show {
  margin: 10px auto;
  width: 200px;
  border: 1px solid #8134af;
}
</style>
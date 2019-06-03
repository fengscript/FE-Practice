<template>
  <div>
    <form action="">
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
          <option v-for="(item,index) in options" :key='index' :value=item.value >{{item.text}}</option>
        </select>
      </div>

    </form>
  </div>
</template>

<script>
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
    };
  },
  methods: {}
};
</script>

<style>
</style>
<template>
  <textarea
    v-model="data"
    name="output"
    id="output"
    cols="80"
    rows="15"
    placeholder="Wainting for convert your image..."
  />
</template>

<script>
export default {
  name: "TestArea",
  data() {
    return {};
  },
  props: {
    data: String
  }
};
</script>

<style>
textarea {
  padding: 12px;
  text-align: justify;
}
</style>

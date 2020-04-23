<template>
  <section
    class="img-trigger-box"
    :class="{ 'drag-over': dragOver }"
    id="img-trigger-box"
    @click="handleClick"
    @drop.prevent="handleDrop"
    @dragover.prevent="handleDragOver"
    @dragleave="handleDragLeave"
    @paste="handlePaste"
  >
    <h3>Covert image to base64</h3>
    <ul class="text-list">
      <li>1. Click to select image</li>
      <li>2. Drago into this box</li>
      <li>3. Paste</li>
    </ul>
    <input type="file" name="file" id="file-input" @change="handleInput" />
  </section>
</template>

<script>
export default {
  name: "TriggerSection",
  data() {
    return {
      dragOver: false
    };
  },
  props: {},
  methods: {
    handlePaste(e) {
      this.$emit("output", e.clipboardData.files[0]);
      // this.outPut(e.clipboardData.files[0]);
    },
    handleClick() {
      document.getElementById("file-input").click();
    },
    handleDrop(e) {
      this.$emit("output", e.dataTransfer.files[0]);
      this.dragOver = false;
      // this.outPut(e.dataTransfer.files[0]);
    },
    handleDragOver() {
      this.dragOver = true;
    },
    handleDragLeave() {
      this.dragOver = false;
    },
    handleInput(e) {
      this.$emit("output", e.target.files[0]);
      // this.outPut(e.target.files[0]);
    }
  }
};
</script>

<style>
.img-trigger-box {
  color: #42b983;
  cursor: pointer;
  width: 32.5rem;
  height: 15rem;
  margin: 4rem 0 2rem 0;
  border: 1px solid #42b983;
}
input {
  display: none;
}
.drag-over {
  outline: 2px dashed #ccc;
  outline-offset: 4px;
}
textarea {
  padding: 12px;
  text-align: justify;
}
.text-list {
  text-align: left;
  list-style: none;
  margin-left: 8rem;
  resize: vertical;
}
</style>

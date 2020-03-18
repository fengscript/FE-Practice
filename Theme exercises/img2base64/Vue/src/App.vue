<template>
  <div id="app">
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
    </section>
    <input type="file" name="file" id="file-input" @change="handleInput" />
    <Textarea :data="convertedText" />
  </div>
</template>
<script>
import Textarea from "./components/Textarea";
export default {
  name: "App",
  data() {
    return {
      file: null,
      convertedText: "",
      dragOver: false
    };
  },
  computed: {},
  props: {},
  components: { Textarea },
  methods: {
    handlePaste(e) {
      this.outPut(e.clipboardData.files[0]);
    },
    handleClick() {
      document.getElementById("file-input").click();
    },
    handleDrop(e) {
      this.outPut(e.dataTransfer.files[0]);
    },
    handleDragOver() {
      this.dragOver = true;
    },
    handleDragLeave() {
      this.dragOver = false;
    },
    handleInput(e) {
      this.outPut(e.target.files[0]);
    },
    async outPut(file) {
      this.convertedText = await this.readBase64(file);
    },
    readBase64(file) {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.addEventListener("load", () => resolve(reader.result));
        reader.readAsDataURL(file);
      });
    }
    // outPut(file) {
    //   this.file = file;
    //   this.readBase64(data => {
    //     this.convertedText = data;
    //   });
    // },
    // async readBase64(cb) {
    // const reader = new FileReader();
    // reader.addEventListener("load", () => cb && cb(reader.result));
    // await reader.readAsDataURL(this.file);
    // }
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
}

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

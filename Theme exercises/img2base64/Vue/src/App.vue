<template>
  <div id="app">
    <TriggerSection @output="output" />
    <Textarea :data="convertedText" />
  </div>
</template>
<script>
import Textarea from "./components/Textarea";
import TriggerSection from "./components/TriggerSection";
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
  components: { Textarea, TriggerSection },
  methods: {
    async output(file) {
      this.convertedText = await this.readBase64(file);
    },
    readBase64(file) {
      return new Promise(resolve => {
        setTimeout(function() {
          const reader = new FileReader();
          reader.addEventListener("load", () => resolve(reader.result));
          reader.readAsDataURL(file);
        }, 2000);
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
</style>

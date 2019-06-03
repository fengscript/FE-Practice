<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <List
        :users='usersList'
        @sendInput='getValue'
      />
    </ul>
    Show input from sub at here:{{showIputStr}}
    <button @click='showInput'>Get value from Sub</button>
    <Forms />
  </div>
</template>

<script>
import List from "./List";
import Forms from "./Forms";

export default {
  name: "HelloWorld",
  data() {
    return {
      usersList: [
        { id: 1, text: "HTML" },
        { id: 2, text: "CSS" },
        { id: 3, text: "JS" }
      ],
      tempStore: "",
      showIputStr:'',
    };
  },
  props: {
    msg: String
  },
  components: {
    List,
    Forms
  },
  methods: {
    getValue(payload) {
      this.tempStore = payload;
    },
    showInput() {
      this.showIputStr = this.tempStore;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

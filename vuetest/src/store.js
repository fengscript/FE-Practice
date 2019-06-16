import Vue from "vue";
import Vuex from "vuex";
import API from "./api/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    t: "",
    items: {},
    persons: {}
  },
  mutations: {
    add: (state, { name, value }) => Vue.set(state.items, name, value),
    remove: (state, { name }) => Vue.delete(state.items, name),
    setPerson(state, data) {
      state.persons = data;
    }
  },
  getters: {
    getLength: state => Object.keys(state.items).length,
    getItems: state => state.items,
    getPerson: state => state.persons
  },
  actions: {
    fetchPersonData(commit) {
      // API.fetch("localhost:3000/person").then(data => {
      //   commit("setPerson", data);
      // });

      fetch("http://localhost:3000/contents", {
        method: "GET"
      })
        .then(response => response.json())
        .then(response => console.log("Success:", JSON.stringify(response)))
        .then(data => {
          commit("setPerson", data);
        });
    }
  }
});

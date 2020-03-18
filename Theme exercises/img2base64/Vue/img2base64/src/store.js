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
    getPersons: state => state.persons
  },
  actions: {
    fetchPersonData({ commit }) {
      API.fetchPerson().then(data => {
        commit("setPerson", data);
      });
    }
  }
});

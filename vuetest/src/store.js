import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: {}
  },
  mutations: {
    add: (state, { name, value }) => Vue.set(state.items, name, value),
    // (state.items[name] = value),
    remove: (state, { name }) => Vue.delete(state.items, name)
  },
  getters: {
    getLength: state => Object.keys(state.items).length,
    getItems: state => state.items
  },
  actions: {}
});

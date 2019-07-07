import createAction from "./tool";
import { createStore } from "redux";

const initState = {
  count: -1
};

const ADD_NUMBER = payload => {
  return {
    type: "ADD_NUMBER",
    payload
  };
};

const actions = {
  ADD_NUMBER
};

const reducer = (state = initState, action) => {
  // const count = state.count;
  switch (action.type) {
    case "ADD_NUMBER":
      // return { count: count + 1 };
      return { ...state, count: state.count + action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer);
export { actions, store };

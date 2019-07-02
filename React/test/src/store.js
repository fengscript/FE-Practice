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
  ADD_NUMBER: ADD_NUMBER
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_NUMBER:
      return { ...state.count, ...ADD_NUMBER.payload };
    default:
      return state;
  }
};

const store = createStore(reducer);
export { actions, store };

import createAction from "./tool";
import { createStore } from "redux";

//  saga
import createSagaMiddleware from "redux-saga";
import { applyMiddleware } from "redux";
// import { helloSaga } from "./saga";

const sagaMiddleware = createSagaMiddleware();
//  saga end
function* helloSaga() {
  console.log("Hello Sagas!");
}

const initState = {
  count: -1
};

const ADD_NUMBER = payload => {
  return {
    type: "ADD_NUMBER",
    payload
  };
};

const SAGATEST = payload => {
  return {
    type: "SAGATEST",
    payload
  };
};

const actions = {
  ADD_NUMBER,
  SAGATEST
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

// const store = createStore(reducer);
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(helloSaga);
export { actions, store };

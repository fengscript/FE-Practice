import createAction from "./tool";
import { createStore, applyMiddleware } from "redux";

//  saga
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();
//  saga end

const initState = {
  count: -1,
  data: "",
  userstate: "null",
  username: "null"
};

const LOGIN = payload => {
  return {
    type: "LOGIN",
    payload
  };
};
const LOGOUT = payload => {
  return {
    type: "LOGOUT",
    payload
  };
};
const LOGIN_SUCCESS = payload => {
  return {
    type: "LOG_SUCCESS",
    payload
  };
};
const LOGIN_ERROR = payload => {
  return {
    type: "LOGIN_ERROR",
    payload
  };
};


const SETLOGININFO = payload => {
  return {
    type: "SET_LOGININFO",
    payload
  };
};

const ADD_NUMBER = payload => {
  return {
    type: "ADD_NUMBER",
    payload
  };
};

const SAGATEST = payload => {
  return {
    type: "INCREASE_ASYNC",
    payload
  };
};

const GET_DATA = payload => {
  return {
    type: "GET_DATA",
    payload
  };
};

const actions = {
  ADD_NUMBER,
  SAGATEST,
  LOGIN,
  LOGOUT,
  SETLOGININFO,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
};

const reducer = (state = initState, action) => {
  // const count = state.count;
  switch (action.type) {
    case "ADD_NUMBER":
      // return { count: count + 1 };
      return { ...state, count: state.count + action.payload };
    // case "INCREASE_ASYNC":
    //   return { ...state, count: state.count + action.payload };
    case "GET_DATA":
      return { ...state, data: action.payload };
    case "LOGIN":
      return { ...state, userstate: "login..." };
    case "LOGOUT":
      return { ...state, userstate: "logout" };
    case "SET_LOGININFO":
      return { ...state, username: action.payload };
    case "LOGIN_SUCCESS":
      return { ...state, userstate: "success" };
    case "LOGIN_ERROR":
      return { ...state, userstate: "error" };
    default:
      return state;
  }
};

// const store = createStore(reducer);
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

// selectors
const selectors = {
  getCount: state => state.count,
  getLoginInfo: state => state.username
};
export { actions, store, selectors };

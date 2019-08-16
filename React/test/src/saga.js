// url
// https://my-json-server.typicode.com/typicode/demo/posts

import {
  call,
  put,
  all,
  take,
  select,
  takeEvery,
  takeLatest
} from "redux-saga/effects";
import { selectors } from "./store";
import _data from "./mockData";

export const delay = second =>
  new Promise(res => {
    console.log(`I will delay ${second} second`);
    setTimeout(res, second * 1000);
  });

async function fetchData(url) {
  const response = await fetch(url);
  return response.json();
}

// function fetchData(url) {
//   return fetch(url).then(response => {
//     return response.json();
//   });
// }

export function* increaseAsync() {
  console.log("saga invoke");

  yield call(delay, 1);

  yield fetchData(_data.remote).then(res => {
    const data = JSON.stringify(res);
    console.log(data);
  });

  yield put({
    type: "ADD_NUMBER",
    payload: 3
  });

  const getCount = yield select();

  console.log(getCount);
}

// INCREASE_ASYNC
export function* watchIncreasementAsync() {
  yield takeEvery("INCREASE_ASYNC", increaseAsync);
}

function helloSaga() {
  console.log("Hello Sagas!");
}

// LOGIN LOGOUT TEST

export function* watchLoginState() {
  while (true) {
    yield take("LOGIN");
    console.log("start login");
    yield delay(1);
    console.log("login finish");
    yield take("LOGOUT");
    console.log("start logout");
    yield delay(1);
    console.log("logout finish");
  }
}

// NO-BLOCK SAGA
function* auth(user, pwd) {
  try {
    // const getToken = localStorage.getItem(user);
    const getToken = yield call(localStorage.getItem, user);
    yield put({ type: "LOGIN_SUCCESS" });
    return getToken;
  } catch (error) {
    yield put({ type: "LOGIN_ERROR" });
  }
}

function* loginFlow() {
  while (true) {
    const token = call(auth, "fyg", "123");
    if (token) {
      yield call(localStorage.setItem({ token }));
      yield take("LOGOUT");
      yield call(localStorage.removeItem("token"));
    }
  }
}

export default function* rootSaga() {
  yield all([helloSaga(), watchIncreasementAsync(), watchLoginState()]);
}

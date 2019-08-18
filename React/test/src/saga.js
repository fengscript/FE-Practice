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

// NO-BLOCK SAGA
function* storeLoginInfo(key, value) {
  yield localStorage.setItem(key, value);
}
function* storeGetInfo(key) {
  return yield localStorage.getItem(key);
}
function* storeClear() {
  yield localStorage.clear();
}

function* watchLogin() {
  while (true) {
    yield take("LOGIN");
    yield call(storeLoginInfo, "fyg", "123");
    yield put({
      type: "SET_LOGININFO",
      payload: "fyg"
    });
    console.log("store_success");
  }
}


function* loginFlow() {
  while (true) {
    yield take("LOGOUT");
    const token = yield call(storeGetInfo,'fyg');
    // const token = localStorage.getItem('fyg');
    console.log("get token :"+token);
    if (token) {
      yield call(storeClear);
    } else {
      console.log("auth error");
      yield put({ type: "LOGIN_ERROR" });
    }
  }
}

export function* watchLoginState() {
  yield takeEvery("LOGIN_SUCCESS", () => {
    console.log("LOGIN_SUCCESS");
  });
  yield takeEvery("SET_LOGININFO", () => {
    console.log("SET_LOGININFO");
  });
  while (true) {
    yield take("LOGIN");
    console.log("start login");
    yield take("LOGOUT");
    console.log("start logout");
    yield take("LOGIN_ERROR");
    console.log("LOGIN_ERROR");
  }
}

export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncreasementAsync(),
    watchLoginState(),
    watchLogin(),
    loginFlow()
  ]);
}

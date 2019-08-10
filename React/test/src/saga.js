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

  yield delay(1);

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

  // let t = call(delay, 1000);
  // console.log(t);
}

// let a = increaseAsync();
// console.log(a.next().value);

// INCREASE_ASYNC
export function* watchIncreasementAsync() {
  yield takeEvery("INCREASE_ASYNC", increaseAsync);
}

function helloSaga() {
  console.log("Hello Sagas!");
}

// function fetchJson(url) {
//   return fetch("http://localhost:3333/person").then(response =>
//     response.json()
//   );
// }

// fetchData().then(data => console.log(JSON.stringify(data)));

export default function* rootSaga() {
  yield all([helloSaga(), watchIncreasementAsync()]);
}

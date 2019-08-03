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

const delay = second => new Promise(res => setTimeout(res, second * 1000));

async function fetchData(url) {
  const response = await fetch(url);
  return response.json();
}

export function* increaseAsync() {
  const getCount = yield select();
  yield fetchData(_data.remote).then(res => {
    
    const data = JSON.stringify(res);

    console.log(data);
  });
  // yield delay(1);
  // console.log(getCount.count);

  //   yield put({
  //     type: "INCREASE_ASYNC",
  //     payload: 1
  //   });

  console.log("data end");
}
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

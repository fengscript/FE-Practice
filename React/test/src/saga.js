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

const delay = second => new Promise(res => setTimeout(res, second * 1000));

export function* increaseAsync() {
  const getCount = yield select();
  yield delay(1);
  console.log("saga in");
  console.log(getCount.count);
  //   yield put({
  //     type: "INCREASE_ASYNC",
  //     payload: 1
  //   });
}
// INCREASE_ASYNC
export function* watchIncreasementAsync() {
  yield takeEvery("INCREASE_ASYNC", increaseAsync);
}

function* helloSaga() {
  console.log("Hello Sagas!");
}

export default function* rootSaga() {
  yield all([helloSaga(), watchIncreasementAsync()]);
}

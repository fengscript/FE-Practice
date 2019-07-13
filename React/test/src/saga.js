import { call, put, takeEvery, takeLatest } from "redux-saga/effects";


const getMsg = async () => {
  await setTimeout(() => {
    console.log("start fetch msg");
  }, 2000);

  setTimeout(() => {
    console.log("no await");
  }, 1000);
};

// getMsg();
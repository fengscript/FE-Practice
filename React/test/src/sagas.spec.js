import { put, call } from "redux-saga/effects";
import { increaseAsync, delay } from "./saga";

const gen = increaseAsync();
test("increaseAsync Saga must call delay(1000)", () => {
  expect(gen.next().value).toEqual(call(delay, 1));
});

test("increaseAsync Saga must dispatch an INCREMENT action", () => {
  expect(gen.next().value).toEqual(put({ type: "INCREMENT" }));
});
test("increaseAsync Saga must be done", () => {
  expect(gen.next()).toEqual({ done: true, value: undefined });
});

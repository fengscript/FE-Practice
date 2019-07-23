# react-thunk

如果存在副作用函数，那么我们需要首先处理副作用函数，然后生成原始的 js 对象。如何处理副作用操作，在 redux 中选择在发出 action，到 reducer 处理函数之间使用中间件处理副作用

在有副作用的 action 和原始的 action 之间增加中间件处理，通过中间件，转换异步操作，生成原始的 action，这样，reducer 函数就能处理相应的 action，从而改变 state，更新 UI。

通过使用指定的 middleware，action 创建函数除了返回 action 对象外还可以返回函数。这时，这个 action 创建函数就成为了 thunk

**_action1(side function)—>redux-thunk 监听—>执行相应的有副作用的方法—>action2(plain object)_**

# react-saga

redux-saga 是一个用于管理副作用的中间件（又称异步 action）。 redux-saga 通过创建 Sagas 将所有的异步操作逻辑收集在一个地方集中处理，可以用来代替 redux-thunk 中间件。

在 redux-saga 中 action 是原始的 js 对象，把所有的异步副作用操作放在了 saga 函数里面。这样既统一了 action 的形式，又使得异步操作集中可以被集中处理。

还是只要在 applyMiddleware 中调用一个 createSagaMiddleware 的实例。唯一不同的是需要调用 run 方法使得 generator 可以开始执行

## effect

`Effect` 执行后，当函数 `resolve` 时返回一个描述对象，然后 `redux-saga` 中间件根据这个描述对象恢复执行 `generator` 中的函数

**_action1(plain object)——>redux-saga 监听—>执行相应的 Effect 方法——>返回描述对象—>恢复执行异步和副作用函数—>action2(plain object)_**

> 通过使用 Effect 类函数，可以方便单元测试，我们不需要测试副作用函数的返回结果。只需要比较执行 Effect 方法后返回的描述对象，与我们所期望的描述对象是否相同即可。

- take: 监听 action，返回的是监听到的 action 对象
- ```javascript
  const loginAction = {
    type:'login'
  }
  //
  dispatch(loginAction)

  //在saga中使用：
  const action = yield take('login');
  //返回的action为：
  {
    type:'login'
  } 
  ```

- call: `call(fn, ...args)` 传入的函数 fn 可以是普通函数，也可以是 generator ,返回一个描述对象
  - `yield call(fetch,'/userInfo',username)`
- put: 对应与 redux 中的 dispatch
  - `yield put({type:'login'})`
- select: 对应的是 redux 中的 getState
  - `const state= yield select()`
- fork: 相当于 web work，不会阻塞主线程，在非阻塞调用中十分有用
- takeEvery: 监听到多个相同的 action，并执行相应的方法。 被调用的任务无法控制何时被调用， 它们将在每次 action 被匹配时一遍又一遍地被调用。并且它们也无法控制何时停止监听
  - take: 与 action 被 推向（pushed） 任务处理函数不同，Saga 是自己主动 拉取（pulling） action 的
- takeLatest: 执行最近的那个被触发的 action

## work flow

1. `store` 中准备 `action` ， `reducer`，引入 `saga` 的 `createSagaMiddleware` 函数, `redux` 引入 `applyMiddleware`
   `store.js`

```javascript
import createAction from "./tool";
import { createStore, applyMiddleware } from "redux";
//  saga
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();
//  saga end

const initState = {
  count: -1
};

const SAGATEST = payload => {
  return {
    type: "INCREASE_ASYNC",
    payload
  };
};

const actions = {
  SAGATEST
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "INCREASE_ASYNC":
      return { ...state, count: state.count + action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
const selectors = {
  getCount: state => state.count
};
export { actions, store, selectors };
```

2. 组件中链接 store

```javascript
...
<button
   onClick={() => {
   Sagatest(1);
   }}>
   Saga
</button>
...
};

const mapDispatchToProps = {
  Sagatest: actions.SAGATEST
};
...
```

3. `saga` 中监听需要的 `action` 的 `type`

`saga.js`

```javascript
import { takeEvery } from "redux-saga/effects";
import { selectors } from "./store";

const delay = second => new Promise(res => setTimeout(res, second * 1000));
// 1. 准备一个saga
export function* increaseAsync() {
  const getCount = yield select();
  yield delay(1);
  console.log("saga in");
  console.log(getCount.count);
  ...
  这里就可以为所欲为的使用 side-effect，或者继续dispatch一个action
   yield put({
      type: "INCREASE_ASYNC",
      payload: 1
   });
}

// 监听需要的 action 的 type
export function* watchIncreasementAsync() {
  yield takeEvery("INCREASE_ASYNC", increaseAsync);
}

export default function* rootSaga() {
  yield all([ watchIncreasementAsync()]);
}

```

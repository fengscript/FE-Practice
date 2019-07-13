# react-thunk
如果存在副作用函数，那么我们需要首先处理副作用函数，然后生成原始的js对象。如何处理副作用操作，在redux中选择在发出action，到reducer处理函数之间使用中间件处理副作用

在有副作用的action和原始的action之间增加中间件处理，通过中间件，转换异步操作，生成原始的action，这样，reducer函数就能处理相应的action，从而改变state，更新UI。

通过使用指定的 middleware，action 创建函数除了返回 action 对象外还可以返回函数。这时，这个 action 创建函数就成为了 thunk

***action1(side function)—>redux-thunk监听—>执行相应的有副作用的方法—>action2(plain object)***

# react-saga
redux-saga 是一个用于管理副作用的中间件（又称异步 action）。 redux-saga 通过创建Sagas将所有的异步操作逻辑收集在一个地方集中处理，可以用来代替redux-thunk中间件。


在redux-saga中action是原始的js对象，把所有的异步副作用操作放在了saga函数里面。这样既统一了action的形式，又使得异步操作集中可以被集中处理。

还是只要在applyMiddleware中调用一个createSagaMiddleware的实例。唯一不同的是需要调用run方法使得generator可以开始执行

## effect
`Effect` 执行后，当函数 `resolve` 时返回一个描述对象，然后 `redux-saga` 中间件根据这个描述对象恢复执行 `generator` 中的函数


***action1(plain object)——>redux-saga监听—>执行相应的Effect方法——>返回描述对象—>恢复执行异步和副作用函数—>action2(plain object)***

> 通过使用Effect类函数，可以方便单元测试，我们不需要测试副作用函数的返回结果。只需要比较执行Effect方法后返回的描述对象，与我们所期望的描述对象是否相同即可。

- take: 监听action，返回的是监听到的action对象
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
  
- call: `call(fn, ...args)` 传入的函数fn可以是普通函数，也可以是 generator ,返回一个描述对象
  - `yield call(fetch,'/userInfo',username)`
- put: 对应与redux中的dispatch
  - `yield put({type:'login'})`
- select: 对应的是redux中的getState
  - `const state= yield select()`
- fork: 相当于web work，不会阻塞主线程，在非阻塞调用中十分有用
- takeEvery
- takeLatest
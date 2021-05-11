```jsx
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <!-- <script src="<https://unpkg.com/redux/dist/redux.js>"></script> -->
    <script src="./redux.js"></script>
    <script>
      //   const { combineReducers } = Redux;
      function createStore(reducer) {
        let state = reducer(undefined, {});
        /**
         * combine 之后， combine 的 大 reudcer 是 {user: fn, counter:fn
         * 走到这里第一次 空转，分别走那两个的default，然后一个给了对象一个给了0
         * 于是组成了大的 state {user: {}, counter: 0 }
         */

        let callbackQuene = [];
        return {
          getState: () => state,
          subscribe: (callback) => {
            callbackQuene.push(callback);
          },
          dispatch: (action) => {
            state = reducer(state, action);
            callbackQuene.forEach((cb) => cb());
          },
        };
      }

      function combineReducers(reducersCollectionObj) {
        let tempObj = {};

        return (state = {}, action) => {
          /**
           *这个 state 就是那个 大 的app要的参数
           *如果不给{} 的话，下面往进传state[item]时候，就找不到state下面的item而报错 --> 因为state是undefined
           * 而给一个默认{}的话，state[item]就会给undefined不会报错
           */

          Object.keys(reducersCollectionObj).forEach((item) => {
            tempObj[item] = reducersCollectionObj[item](state[item], action);
          });
          return tempObj;
        };
      }

      function app(state = {}, action) {
        return {
          user: user(state.user, action),
          counter: counter(state.counter, action),
        };
      }

      function user(state = {}, action) {
        switch (action.type) {
          case "MODIFY_NAME":
            return { ...state, name: action.name };
          case "MODIFY_AGE":
            return { ...state, age: action.age };
          default:
            return state;
        }
      }

      function counter(state = 0, action) {
        switch (action.type) {
          case "INCREMENT":
            return state + 1;
          case "DECREMENT":
            return state - 1;
          default:
            return state;
        }
      }

      // let store = createStore(counter);
      //   let store = createStore(app);
      let store = createStore(combineReducers({ user, counter }));

      store.subscribe(() => console.log(store.getState()));
      store.dispatch({ type: "MODIFY_NAME", name: "XXX" });
      store.dispatch({ type: "MODIFY_AGE", age: 18 });

      store.dispatch({ type: "INCREMENT" });
      // 1
      store.dispatch({ type: "INCREMENT" });
      // 2
      store.dispatch({ type: "DECREMENT" });
      // 1
    </script>
  </body>
</html>
```
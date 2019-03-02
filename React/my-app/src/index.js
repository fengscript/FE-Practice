import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import counterReducer from "./Test/reducers";
import Counter from "./Test/Counter";

ReactDOM.render(<App />, document.getElementById("root"));
// const store = createStore(counterReducer);

// const render = () =>
//   ReactDOM.render(
//     <Counter
//       value={store.getState()}
//       onIncrement={() => store.dispatch({ type: "INCREMENT" })}
//       onDecrement={() => store.dispatch({ type: "DECREMENT" })}
//     />,
//     document.getElementById("root")
//   );

// render()
// store.subscribe(render)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

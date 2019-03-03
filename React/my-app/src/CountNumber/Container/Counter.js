import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "../Store/reducer";

const store = createStore(reducer);

const Counter = () => {
  return (
    <Counter
      value={store.getState()}
      onIncrement={() => store.dispatch({ type: "INCREMENT" })}
      onDecrement={() => store.dispatch({ type: "DECREMENT" })}
    />
  );
};

export default Counter;
render();
store.subscribe(render);
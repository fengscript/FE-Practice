import React, { Component } from "react";
import "./App.css";
import { createStore } from "redux";
import counter from "./Test/reducers";
import Counter from "./Counter";

const store = createStore(counter);

const CounterWrapper = () => {
  return (
    <Counter
      value={store.getState()}
      onIncrement={() => (store.dispatch({ type: "INCREMENT" },console.log("click")))}
      onDecrement={() => store.dispatch({ type: "DECREMENT" })}
    />
  );
};


store.subscribe(CounterWrapper);

class App extends Component {
  render() {
    return (
      <div className="App">
        123
        <CounterWrapper />
      </div>
    );
  }
}

export default App;

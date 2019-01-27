import React, { Component } from "react";
import * as TEST from "react";
import logo from "./logo.svg";
import "./App.css";
import { createStore } from "redux";
import counter from "./Store/reducers/index";
import Counter from "./Counter";
console.log(TEST);

const store = createStore(counter);

const CounterWrapper = () => {
  return (
    <Counter
      value={store.getState()}
      onIncrement={() => store.dispatch({ type: "INCREMENT" })}
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

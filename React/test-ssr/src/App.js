import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const Counter = () => {
  const [count, setCounter] = useState(0);
  return (
    <div>
      <div className="counter">{count}</div>
      <button onClick={() => setCounter(count + 1)}>Add</button>
    </div>
  );
};
function App() {
  return (
    <div className="App">
      <h1> SSR Test</h1>
      <Counter />
    </div>
  );
}

export default App;

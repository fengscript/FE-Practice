import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Test from "./t/hoook";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
      </header>
      {Test.OriginFunction("fyg")}
      <Test.Functional name="FYG"/>
      <Test.Hook  />
    </div>
  );
}

export default App;

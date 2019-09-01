import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Test from "./t/hoook";
import AddNumber from "./t/AddNumber";
import { Provider } from "react-redux";
import { store } from "./store";
import Login from "./Login";
import JsxTest from "./jsxTest";
import FormNomal, { FormikTest, FormikHelper } from "./form/FormikTest1.js";

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
      <Test.Functional name="FYG" />
      <Test.Hook />
      <Provider store={store}>
        <AddNumber />
      </Provider>
      <Provider store={store}>
        <Login />
      </Provider>
      <JsxTest />
      <FormNomal />
      <FormikTest />
      <FormikHelper />
    </div>
  );
}

export default App;

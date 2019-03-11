import React, { Component }  from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "../Store/reducer";

// const store = createStore(reducer);

class Counter extends Component {
  render() {
    const { value, onIncrement, onDecrement } = this.props;
    return (
      <p>
        Clicked: 【 {value} 】 times
        {' '}
        <button onClick={onIncrement}> + </button>
        {' '}
        <button onClick={onDecrement}> - </button>
      </p>
    );
  }
}

export default Counter;
// render();
// store.subscribe(render);

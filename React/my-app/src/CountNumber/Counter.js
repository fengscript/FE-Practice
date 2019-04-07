import React, { Component } from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { action_add, reducer, store } from "./store";
import ReactDOM from 'react-dom';

class ConunterNumberContainer extends Component {
  constructor(props) {
    super(props);
    // this.onIncrement = this.onIncrement.bind(this)
    // this.onDecrement = this.onDecrement.bind(this)
  }


  onDecrement() { }
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

const rootElement = document.getElementById("root");
const onIncrement = () => {
  store.dispatch({
    type: 'ADD',
    payload: 1,
  })
}
const onDecrement = () => {
  store.dispatch({
    type: 'DREASE',
    payload: 1,
  })
}
const ConunterNumber = () => 
  ReactDOM.render(<ConunterNumberContainer
  value = {store.getState().value}
  onIncrement = {onIncrement}
  onDecrement = {onDecrement}
  />, rootElement);
  
store.subscribe(ConunterNumber);
export default ConunterNumber;


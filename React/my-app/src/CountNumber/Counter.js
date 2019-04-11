import React, { Component } from "react";
import { store, action } from "./store";
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
  store.dispatch(action.add(1))
}
const onDecrement = () => {
  store.dispatch(action.decrease(1))
}
const ConunterNumber = () =>
  ReactDOM.render(<ConunterNumberContainer
    value={store.getState().value}
    onIncrement={onIncrement}
    onDecrement={onDecrement}
  />, rootElement);

store.subscribe(ConunterNumber);
export default ConunterNumber;


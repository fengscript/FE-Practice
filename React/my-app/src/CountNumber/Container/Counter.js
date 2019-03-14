import React, { Component }  from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "../Store/reducer";

// const store = createStore(reducer);

class ConunterNumber extends Component {
  constructor(props) {
    super(props);
    this.state={
      value:0
    }
  }
  onIncrement(){console.log(1);}
  onDecrement(){console.log(2);}
  render() {
    // const { value, onIncrement, onDecrement } = this.props;
    return (
      <p>
        Clicked: 【 {this.state.value} 】 times
        {' '}
        <button onClick={this.onIncrement}> + </button>
        {' '}
        <button onClick={this.onDecrement}> - </button>
      </p>
    );
  }
}

export default ConunterNumber;
// render();
// store.subscribe(render);

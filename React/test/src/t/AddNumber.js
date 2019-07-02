import React, { Component, useState, useEffect } from "react";
import { actions } from "../store";
import { connect } from "react-redux";

class AddNumber extends Component {
  render() {
    const { counter, ADD_NUMBER } = this.props;
    return (
      <div>
        <div>{counter}</div>
        <button
          onClick={() => {
            ADD_NUMBER(1);
          }}>
          Add
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  counter: state.count
});

const mapDispatchToProps = {
  ADD_NUMBER: actions.ADD_NUMBER
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNumber);

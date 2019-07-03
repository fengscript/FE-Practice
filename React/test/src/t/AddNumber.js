import React, { Component, useState, useEffect } from "react";
import { actions, store } from "../store";
import { connect } from "react-redux";

// class AddNumber extends Component {
//   render() {
//     const { count, ADD_NUMBER } = this.props;
//     return (
//       <div>
//         <div>{count}</div>
//         <button
//           onClick={() => {
//             ADD_NUMBER(1);
//           }}>
//           Add
//         </button>
//       </div>
//     );
//   }
// }

const AddNumber = ({ ...props }) => {
  const { count, ADD_NUMBER } = props;
  return (
    <div>
      <div>{count}</div>
      <button
        onClick={() => {
          ADD_NUMBER(1);
        }}>
        Add
      </button>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  count: state.count
});

const mapDispatchToProps = {
  ADD_NUMBER: actions.ADD_NUMBER
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNumber);
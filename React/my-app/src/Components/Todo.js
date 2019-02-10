import React from "react";

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? "line-throgh" : "none"
    }}>
    {text}
  </li>
);

export default Todo;
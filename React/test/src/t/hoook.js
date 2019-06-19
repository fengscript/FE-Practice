import React, { useState } from "react";

const OriginFunction = name => {
  return <h3>I will show you OriginFunction - {name}</h3>;
};

const Functional = ({ name }) => {
  return <h3>I will show you Functional - {name}</h3>;
};

const Hook = () => {
  const [count, setCount] = useState(0);
};

export default {
  OriginFunction,
  Functional,
  Hook
};

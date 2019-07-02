import React, { useState, useEffect } from "react";

const OriginFunction = name => {
  return <h3>I will show you OriginFunction - {name}</h3>;
};

const Functional = ({ name }) => {
  return <h3>I will show you Functional - {name}</h3>;
};

const Hook = () => {
  const [count, setCount] = useState(0);
  const [info, setInfo] = useState({ name: "", age: 0 });

  useEffect(() => {
    alert(` I'm Effect! `);

    return () => {};
  }, []);

  return (
    <div>
      <p>WOW! You clicked me {count} times</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}>
        Click Me
      </button>
    </div>
  );
};

export default {
  OriginFunction,
  Functional,
  Hook
};

import React, { useState, useEffect } from "react";

const Login = () => {
  const [password, setPassword] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    return () => {};
  }, []);

  const Logout = () => {
    setState("Logout");
  };
  return (
    <div>
      <input
        type="password"
        name="password"
        id="password"
        // value={password}
        onChange={e => {
          setPassword(e.target.value);
        }}
      />
      <p>state - {state}</p>
      <p>my input - {password}</p>
      <button
        onClick={() => {
          Login();
        }}>
        Login
      </button>
      <button
        onClick={() => {
          Logout();
        }}>
        Logout
      </button>
    </div>
  );
};

export { Login };

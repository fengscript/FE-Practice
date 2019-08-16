import React, { useState, useEffect } from "react";
import { actions, store } from "./store";
import { connect } from "react-redux";

const Login = (props) => {
  const [password, setPassword] = useState("");
  const [state, setState] = useState("");
  const {SET_LOGIN, SET_LOGOUT} = props;

  useEffect(() => {
    return () => {};
  }, []);

  const handleLogin = () => {
    SET_LOGIN()
    setState("Login");
  };
  const handleLogout = () => {
    SET_LOGOUT()
    setState("Logout");
  };
  return (
    <div>
      <input
        type="password"
        name="password"
        id="password"
        onChange={e => {
          setPassword(e.target.value);
        }}
      />
      <p>state - {state}</p>
      <p>my input - {password}</p>
      <button
        onClick={() => {
          handleLogin();
        }}>
        Login
      </button>
      <button
        onClick={() => {
          handleLogout();
        }}>
        Logout
      </button>
      <br />
      <button
        onClick={() => {
          console.log(store.getState());
        }}>
        GET STATE
      </button>
    </div>
  );
};

// export { Login };

const mapStateToProps = (state, ownProps) => ({
  userstate: state.userstate
});

const mapDispatchToProps = {
  SET_LOGIN: actions.LOGIN,
  SET_LOGOUT: actions.LOGOUT
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
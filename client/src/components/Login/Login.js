import React, { useState, useEffect } from "react";
import { useQuery } from "react-apollo";

import { getUsersQuery } from "../../queries/queries";
import TextField from "@material-ui/core/TextField";
import classes from "./Login.module.css";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const { data } = useQuery(getUsersQuery);

  const newUsername = (e) => {
    setError(true);
    setUsername(e.target.value);
  };

  const passwordInput = (e) => {
    setPasswordError(true);
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (!data || data.users.length === 0) {
      return;
    } else {
      data.users.map((user) => {
        if (user.username === username) setError(false);
        if (user.password === password) setPasswordError(false);
        if (!username) setError(false);
        if (!password) setPasswordError(false);
        return null;
      });
    }
  }, [username, password, data]);

  const submitForm = (e) => {
    e.preventDefault();
    if (!username || !password) return;
    props.history.push({ pathname: "tasks", state: [username, password] });
  };

  return (
    <div className={classes.LoginPage}>
      <form onSubmit={(e) => submitForm(e)}>
        <div className={classes.Login}>
          <TextField
            required
            autoComplete='off'
            error={error ? true : false}
            helperText={error ? "Username not found." : " "}
            id='standard-required'
            label='Username'
            onChange={(e) => newUsername(e)}
            value={username}
            className={classes.Input}
          />
          <TextField
            required
            error={passwordError ? true : false}
            helperText={passwordError ? "Wrong password." : " "}
            id='standard-required'
            type='password'
            label='Password'
            onChange={(e) => passwordInput(e)}
            value={password}
          />
          <button className={classes.LoginButton} disabled={error || passwordError ? true : false}>
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default React.memo(Login);

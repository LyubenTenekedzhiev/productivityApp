import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-apollo";
import { withRouter } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import { addUserMutation, getUsersQuery } from "../../queries/queries";
import classes from "./AddUser.module.css";

function AddUser({ history }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [startWithLetterErr, setStartWithLetterErr] = useState(false);

  const [addUser] = useMutation(addUserMutation);
  const { data } = useQuery(getUsersQuery);

  const submitForm = (e) => {
    e.preventDefault();
    if (!username || !password) return;
    addUser({
      variables: {
        username: username,
        password: password,
      },
    });
    history.push({ pathname: "/tasks", state: [username, password] });
  };

  const newUsername = (e) => {
    setStartWithLetterErr(false);
    setError(false);
    setUsernameError(false);
    setUsername(e.target.value);
  };

  const newPassword = (e) => {
    setPasswordError(false);
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (!data || data.users.length === 0) {
      return;
    } else {
      data.users.map((user) => {
        if (user.username === username) setError(true);
        return undefined;
      });
    }
    if (username.match(/^[a-zA-Z\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9](?:_?[a-z0-9_.-])*$/i) === null) setUsernameError(true);
    if (username.slice(0, 1).match(/[a-zA-Z]/i) === null) setStartWithLetterErr(true);
    if (!username) {
      setUsernameError(false);
      setStartWithLetterErr(false);
      setError(false);
    }
    if (password.length < 5) setPasswordError(true);
    if (password.length === 0) setPasswordError(false);
  }, [username, password, data]);

  return (
    <div className={classes.RegisterPage}>
      <form onSubmit={(e) => submitForm(e)} className={classes.Register}>
        <TextField
          required
          autoComplete='off'
          id='standard-required'
          label='Username'
          error={error || usernameError || startWithLetterErr ? true : false}
          helperText={
            error
              ? "Username already exists."
              : startWithLetterErr
              ? "Start with a letter"
              : usernameError
              ? "Only alphanumeric allowed"
              : " "
          }
          onChange={(e) => newUsername(e)}
          value={username}
        />
        <TextField
          required
          id='standard-required'
          label='Password'
          type='password'
          error={passwordError ? true : false}
          helperText={passwordError ? "Must contain at least 5 symbols" : " "}
          onChange={(e) => newPassword(e)}
          value={password}
        />
        <button className={classes.RegisterButton} disabled={error || passwordError || usernameError || startWithLetterErr ? true : false}>
          Sign up
        </button>
      </form>
    </div>
  );
}
export default React.memo(withRouter(AddUser));

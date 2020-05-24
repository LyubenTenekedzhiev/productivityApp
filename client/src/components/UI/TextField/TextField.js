import React from "react";
import TextField from "@material-ui/core/TextField";

function CustomInput({ error, changed, username, usernameError, startWithLetterErr }) {
  return (
    <div>
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
        onChange={changed}
        value={username}
      />
    </div>
  );
}

export default CustomInput;

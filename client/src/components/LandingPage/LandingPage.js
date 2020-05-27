import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import Login from "../Login/Login";
import Register from "../AddUser/AddUser";
import classes from "./LandingPage.module.css";

function LandingPage({ location, history }) {
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);

  const registerForm = () => {
    setRegister(true);
    setLogin(false);
  };
  const logInForm = () => {
    setLogin(true);
    setRegister(false);
  };

  return (
    <div className={classes.LandingPage}>
      <div style={{ alignSelf: "flex-start" }}>
        <h3 className={classes.LandingPage_AppName}>NotesCatcher</h3>
        <h4 className={classes.LandingPage_Subtitle}>Increase your productivity step by step</h4>
      </div>
      <div className={classes.LandingPage_Description}>
        <div className={classes.LandingPage_DescriptionTextContainer}>
          <h3 className={classes.LandingPage_DescriptionText}>About the app</h3>
          <p className={classes.LandingPage_DescriptionParagraph}>
            NotesCatcher is a to-do app which aims to increase one's daily efficiency and reduce the rising stress levels, caused by poor
            self-organisation.
          </p>
          <h3 className={classes.LandingPage_DescriptionText}>Why NotesCatcher?</h3>
          <ul>
            <li>user-friendly</li>
            <li>suitable for all your devices</li>
            <li>and it's free</li>
          </ul>
        </div>
        <div className={classes.LandingPage_Authentication}>
          <div className={classes.LandingPage_AuthenticationButtons}>
            <h3 className={classes.LandingPage_Register} onClick={registerForm}>
              Register
            </h3>
            <h3 className={classes.LandingPage_Login} onClick={logInForm}>
              Login
            </h3>
            {location.state ? (
              <NavLink
                to={{ pathname: "/tasks", state: [location.state[0], location.state[1]] }}
                style={{ textDecoration: "none", alignSelf: "flex-start" }}
              >
                <h3 className={classes.LandingPage_Login}>Your profile</h3>
              </NavLink>
            ) : null}
          </div>
          <div className={classes.LandingPage_AuthenticationForm}>{login ? <Login /> : register ? <Register /> : <p></p>}</div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

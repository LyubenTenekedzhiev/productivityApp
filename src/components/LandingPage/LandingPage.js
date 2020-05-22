import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./LandingPage.module.css";

function LandingPage() {
  return (
    <div className={classes.LandingPage}>
      <NavLink to='/register' style={{ textDecoration: "none" }}>
        <h3 className={classes.LandingPage_Register}>Register</h3>
      </NavLink>
      <NavLink to='/login' style={{ textDecoration: "none" }}>
        <h3 className={classes.LandingPage_Login}>Login</h3>
      </NavLink>
    </div>
  );
}

export default LandingPage;

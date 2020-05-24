import React from "react";
import { NavLink } from "react-router-dom";

import landingPageImg from "../../assets/landingPage.png";
import tasks from "../../assets/taskMngm.png";
import conquer from "../../assets/conquer.png";
import classes from "./LandingPage.module.css";

function LandingPage({ location, history }) {
  const logout = () => {
    history.replace();
  };
  console.log(location.state);
  return (
    <>
      {!location.state ? (
        <div className={classes.LandingPage}>
          <h3 className={classes.LandingPage_AppName}>NoteCatcher</h3>
          <div className={classes.LandingPage_Section}>
            <img className={classes.landingPageImgOne} src={tasks} alt='App Preview' />
            <h3>blablabla</h3>
          </div>
          <div className={classes.LandingPage_Section}>
            <h3>blalbalb</h3>
            <img className={classes.landingPageImgOne} src={conquer} alt='App Preview' />
          </div>
          <div className={classes.LandingPage_Links}>
            <NavLink to='/register' style={{ textDecoration: "none" }}>
              <h3 className={classes.LandingPage_Register}>Register</h3>
            </NavLink>
            <NavLink to='/login' style={{ textDecoration: "none" }}>
              <h3 className={classes.LandingPage_Login}>Login</h3>
            </NavLink>
          </div>
        </div>
      ) : (
        <div className={classes.LandingPage}>
          <h3 className={classes.LandingPage_AppName}>NoteCatcher</h3>
          <div className={classes.LandingPage_Section}>
            <img className={classes.landingPageImgOne} src={tasks} alt='App Preview' />
            <h3>blablabla</h3>
          </div>
          <div className={classes.LandingPage_Section}>
            <h3>blalbalb</h3>
            <img className={classes.landingPageImgOne} src={conquer} alt='App Preview' />
          </div>
          <div className={classes.LandingPage_Links}>
            {/* <NavLink to='/register' style={{ textDecoration: "none" }}>
              <h3 className={classes.LandingPage_Register}>Register</h3>
            </NavLink>
            <NavLink to='/login' style={{ textDecoration: "none" }}>
              <h3 className={classes.LandingPage_Login}>Login</h3>
            </NavLink> */}
            <NavLink to={{ pathname: "/tasks", state: [location.state[0], location.state[1]] }} style={{ textDecoration: "none" }}>
              <h3 className={classes.LandingPage_Login}>{location.state[0]}'s profile</h3>
            </NavLink>
            <button onClick={logout} className={classes.LandingPage_Logout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default LandingPage;

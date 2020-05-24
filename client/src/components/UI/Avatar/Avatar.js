import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";

import styles from "./Avatar.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    margin: "0 auto",
    padding: "3rem 0 .5rem 0",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

function LetterAvatars({ username, password }) {
  const classes = useStyles();
  const colors = [classes.orange, classes.purple, null];
  const randomNum = Math.floor(Math.random() * 3);

  return (
    <div className={classes.root}>
      <div className={styles.AvatarText}>
        <Avatar className={colors[randomNum]}>{username.slice(0, 1).toUpperCase()}</Avatar>
        <h3 className={styles.AvatarName}>Welcome, {username}. Time to be productive!</h3>
      </div>
      <NavLink to={{ pathname: "/", state: [username, password] }} className={styles.HomeLink} >Home</NavLink>
    </div>
  );
}

export default React.memo(LetterAvatars);

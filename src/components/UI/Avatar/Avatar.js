import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
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

function LetterAvatars({ letters }) {
  const classes = useStyles();
  const colors = [classes.orange, classes.purple, null];
  const randomNum = Math.floor(Math.random() * 3);

  return (
    <div className={classes.root}>
      <Avatar className={colors[randomNum]}>{letters.slice(0, 1).toUpperCase()}</Avatar>
      <h3>Welcome, {letters}. Time to be productive!</h3>
    </div>
  );
}

export default React.memo(LetterAvatars);

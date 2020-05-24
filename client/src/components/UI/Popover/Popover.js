import React from "react";
import Popover from "@material-ui/core/Popover";
import { makeStyles } from "@material-ui/core/styles";

import styles from "./Popover.module.css";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
    overflow: "hidden",
  },
  paper: {
    padding: theme.spacing(1),
    overflow: "hidden",
  },
}));

export default function MouseOverPopover({ anchorEl, closed, content }) {
  const classes = useStyles();
  const open = Boolean(anchorEl);

  return (
    <div>
      <Popover
        id='mouse-over-popover'
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={closed}
        disableRestoreFocus
      >
        <p className={styles.Popover}>{content}</p>
      </Popover>
    </div>
  );
}

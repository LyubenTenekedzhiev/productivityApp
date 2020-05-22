import React, { useState } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";

import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import UndoIcon from "@material-ui/icons/Undo";

import Popover from "../UI/Popover/Popover";
import { removeTaskMutation, getUserQuery } from "../../queries/queries";
import classes from "./Task.module.css";

function Task({ description, date, id, removeTaskMutation, username, password }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [content, setContet] = useState("");
  const [completed, setCompleted] = useState(false);

  const removeTask = () => {
    removeTaskMutation({
      variables: {
        id: id,
      },
      refetchQueries: [{ query: getUserQuery, variables: { username: username, password: password } }],
    });
  };

  const completeTask = () => {
    setCompleted(true);
  };

  const undoCompleted = () => {
    setCompleted(false);
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    if (event.currentTarget.innerHTML === `<path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path>`) {
      setContet("Ready!");
    } else if (
      event.currentTarget.innerHTML ===
      `<path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"></path>`
    ) {
      setContet("Not ready yet? Undo.");
    } else {
      setContet("Remove");
    }
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className={classes.Task} style={completed ? { textDecoration: "line-through" } : null}>
        <div>
          <h4 className={classes.Task_Title}>{description}</h4>
        </div>
        <div className={classes.Task_Icons}>
          <DoneIcon
            className={classes.Task_Icon}
            onClick={completeTask}
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          />
          <UndoIcon
            className={classes.Task_Icon}
            onClick={undoCompleted}
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          />
          <ClearIcon
            className={classes.Task_Icon}
            onClick={removeTask}
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          />
        </div>
      </div>
      <Popover anchorEl={anchorEl} closed={handlePopoverClose} content={content} />
    </>
  );
}

export default compose(graphql(getUserQuery, { name: "getUserQuery" }), graphql(removeTaskMutation, { name: "removeTaskMutation" }))(Task);

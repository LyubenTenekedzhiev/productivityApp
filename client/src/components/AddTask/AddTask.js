import React, { useState } from "react";
import { useMutation } from "react-apollo";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

import TextField from "@material-ui/core/TextField";
import { addTaskMutation, getUserQuery } from "../../queries/queries";
import Snackbar from "../UI/Snackbar/Snackbar";
import Avatar from "../UI/Avatar/Avatar";
import TasksList from "../TasksList/TasksList";
import AddIcon from "@material-ui/icons/Add";
import Slide from "@material-ui/core/Slide";
import Fade from "@material-ui/core/Fade";
import classes from "./AddTask.module.css";

function SlideTransition(props) {
  return <Slide {...props} direction='up' />;
}

function AddTask({ location, history }) {
  if (!location.state) history.goBack();

  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toString().slice(0, 15));
  const [addTask] = useMutation(addTaskMutation);
  const [state, setState] = useState({
    open: false,
    Transition: Fade,
  });

  const handleOpenSnackbar = (Transition) => () => {
    setState({
      open: true,
      Transition,
    });
  };

  const handleCloseSnackbar = () => {
    setState({
      ...state,
      open: false,
    });
  };

  const handleDateChange = (event, date) => {
    setSelectedDate(new Date(date).toString().slice(0, 15));
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!description || !selectedDate) return;
    addTask({
      variables: {
        description: description,
        date: selectedDate,
        user: location.state[0],
        completed: false,
      },
      refetchQueries: [{ query: getUserQuery, variables: { username: location.state[0], password: location.state[1] } }],
    });
    setDescription("");
  };

  return (
    <>
      <Avatar username={location.state[0]} password={location.state[1]} />
      <TasksList username={location.state[0]} password={location.state[1]} />
      <div className={classes.Form}>
        <form
          className={classes.AddTask}
          onSubmit={(e) => {
            submitForm(e);
            handleOpenSnackbar(SlideTransition);
          }}
        >
          <TextField
            required
            id='standard-required'
            label='Task'
            autoComplete='off'
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          {/* Date Picker */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant='inline'
              format='MM/dd/yyyy'
              margin='normal'
              id='date-picker-inline'
              label='Due to:'
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
          <button className={classes.AddTask_Button} onClick={handleOpenSnackbar(SlideTransition)}>
            <AddIcon className={classes.MuiSvgIcon} />
          </button>
        </form>
      </div>
      <Snackbar handleClose={handleCloseSnackbar} open={state.open} transition={state.Transition} />
    </>
  );
}

export default React.memo(AddTask);

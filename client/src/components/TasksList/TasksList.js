import React, { useEffect, useState, useCallback } from "react";
import { useQuery } from "react-apollo";
import ScrollToBottom, { useScrollTo } from "react-scroll-to-bottom";

import Task from "./../Task/Task";
import Spinner from "../UI/Spinner/Spinner";
import TodayIcon from "@material-ui/icons/Today";
import { getUserQuery } from "../../queries/queries";
import productivityImg from "../../assets/productivity.png";
import tasksDone from "../../assets/tasksDone2.png";
import classes from "./TasksList.module.css";

function TasksList({ username, password }) {
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const [tasksData, setTasksData] = useState([]);
  const [dates, setDates] = useState([]);
  const [tasksFetched, setTasksFetched] = useState(false);

  const { data } = useQuery(getUserQuery, { variables: { username: username, password: password } });

  const getDates = useCallback(() => {
    if (!tasksData) return;
    setDates(
      tasksData
        .map((task) => task.date)
        .filter((date, index, array) => array.indexOf(date) === index)
        .sort((a, b) => {
          return new Date(a) - new Date(b);
        })
    );
  }, [tasksData]);

  useEffect(() => {
    setTasksFetched(false);
    if (data === undefined) return undefined;
    setTimeout(() => {
      if (!data.user || data.user.length === 0) {
        return;
      }
      setTasksData(data.user[0].tasks);
      setTasksFetched(true);
    }, 0);
  }, [data]);

  useEffect(() => {
    getDates();
  }, [tasksData, getDates]);

  let tasks = null;
  if (tasksFetched && tasksData.length === 0) {
    tasks = (
      <div className={classes.TasksList_Empty}>
        <img className={classes.TasksList_Img} src={productivityImg} alt='productivity' />
        <div className={classes.TasksList_Quotes}>
          <h3 className={classes.TasksList_Quote}>Burning out?</h3>
          <h3 className={classes.TasksList_Quote}>Take notes.</h3>
          <h3 className={classes.TasksList_Quote}>Act on time.</h3>
        </div>
      </div>
    );
  } else if (!tasksData) {
    tasks = <Spinner />;
  } else {
    tasks = dates.map((date) => {
      return (
        <div key={date} className={classes.DailyTasks}>
          <h4 className={classes.Day}>
            {date === new Date().toString().slice(0, 15) ? (
              <span className={classes.Task_Calendar}>
                Today <TodayIcon />
              </span>
            ) : date === tomorrow.toString().slice(0, 15) ? (
              "Tomorrow"
            ) : date === yesterday.toString().slice(0, 15) ? (
              "Yesterday"
            ) : (
              date
            )}
          </h4>
          {tasksData.map((task) => {
            if (date === task.date) {
              return (
                <Task
                  key={task.id}
                  description={task.description}
                  date={date === new Date().toString().slice(0, 15) ? "Today" : date}
                  completed={task.completed}
                  id={task.id}
                  username={username}
                  password={password}
                />
              );
            }
            return undefined;
          })}
          <div className={classes.TasksList_Done}>
            <img className={classes.TasksList_Img} src={tasksDone} alt='Tasks done!' />
            {/* <div className={classes.TasksList_Quotes}>
              <h3 className={classes.TasksList_Quote}>Conquer your dreams with small steps.</h3>
            </div> */}
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <ScrollToBottom className={classes.Tasks} mode='top'>
        {tasks}
      </ScrollToBottom>
    </div>
  );
}

export default React.memo(TasksList);

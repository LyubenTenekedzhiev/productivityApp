import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Route, Switch, Redirect } from "react-router-dom";

import TasksList from "./components/TasksList/TasksList";
import AddTask from "./components/AddTask/AddTask";
import AddUser from "./components/AddUser/AddUser";
import Login from "./components/Login/Login";
import LandingPage from "./components/LandingPage/LandingPage";
import "./App.css";

const client = new ApolloClient({
  uri: " https://notescatchers.herokuapp.com/graphql",
});

function App() {
  const today = new Date().toString().slice(0, 15);
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <Switch>
          <Route path='/' component={LandingPage} exact />
          <Route path='/register' component={AddUser} />
          <Route path='/login' component={Login} />
          <Route path='/tasks' component={AddTask} />
          <Redirect from='/' to='/' />
        </Switch>
      </div>
    </ApolloProvider>
  );
}

export default App;

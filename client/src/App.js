import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Route, Switch, Redirect } from "react-router-dom";

import AddTask from "./components/AddTask/AddTask";
import LandingPage from "./components/LandingPage/LandingPage";
import "./App.css";

const client = new ApolloClient({
  uri: " https://notescatchers.herokuapp.com/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <Switch>
          <Route path='/' component={LandingPage} exact />
          <Route path='/tasks' component={AddTask} />
          <Redirect from='/' to='/' />
        </Switch>
      </div>
    </ApolloProvider>
  );
}

export default App;

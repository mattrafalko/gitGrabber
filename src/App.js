import React from "react";
import "./App.css";
import Navbar from "./Components/Layout/Navbar";
import User from "./Components/Users/User";
import Alert from "./Components/Layout/Alert";
import About from "./Components/Pages/About";
import Home from "./Components/Pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound from "./Components/Pages/NotFound";
//Context
import GitHubState from "./Context/github/GitHubState";
import AlertState from "./Context/alert/AlertState";

const App = () => {
  return (
    <GitHubState>
      <AlertState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert />
              <Switch>
                <Route exact path="/" render={props => <Home />} />
                <Route
                  exact
                  path="/user/:login"
                  render={props => <User {...props} />}
                />
                <Route exact path="/about" render={About} />
                <Route render={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GitHubState>
  );
};

export default App;

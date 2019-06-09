import React, { useState } from "react";
import "./App.css";
import Navbar from "./Components/Layout/Navbar";
import Users from "./Components/Users/Users";
import User from "./Components/Users/User";
import Search from "./Components/Search/Search";
import Alert from "./Components/Layout/Alert";
import About from "./Components/Pages/About";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Context
import GitHubState from "./Context/github/GitHubState";

const App = () => {
  const [alert, setAlertMessage] = useState(null);

  const setAlert = (message, type) => {
    setAlertMessage({ message, type });
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  return (
    <GitHubState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <React.Fragment>
                    <Search setAlert={setAlert} />
                    <Users />
                  </React.Fragment>
                )}
              />
              <Route
                exact
                path="/user/:login"
                render={props => <User {...props} />}
              />
              <Route exact path="/about" render={About} />
            </Switch>
          </div>
        </div>
      </Router>
    </GitHubState>
  );
};

export default App;

import React, { useState } from "react";
import "./App.css";
import Navbar from "./Components/Layout/Navbar";
import Users from "./Components/Users/Users";
import User from "./Components/Users/User";
import Search from "./Components/Search/Search";
import axios from "axios";
import Alert from "./Components/Layout/Alert";
import About from "./Components/Pages/About";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlertMessage] = useState(null);

  const searchUsers = async searchText => {
    try {
      setLoading(true);
      const github_data = await axios.get(
        `https://api.github.com/search/users?q=${searchText}&client_id=${
          process.env.REACT_APP_GITHUB_CLIENT_ID
        }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      setUsers(github_data.data.items);
      setLoading(false);
    } catch {
      setLoading(true);
      setAlertMessage({
        message: "Search Failed. Please try again.",
        type: "danger"
      });
    }
  };

  const getUser = async login => {
    try {
      setLoading(true);
      const github_data = await axios.get(
        `https://api.github.com/users/${login}?client_id=${
          process.env.REACT_APP_GITHUB_CLIENT_ID
        }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      setUser(github_data.data);
    } catch {
      setLoading(false);
      setAlertMessage({
        message: "Error loading user. Please try again.",
        type: "danger"
      });
    }
  };

  const getUserRepos = async login => {
    try {
      setLoading(true);
      const github_data = await axios.get(
        `https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${
          process.env.REACT_APP_GITHUB_CLIENT_ID
        }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      setRepos(github_data.data);
      setLoading(false);
    } catch {
      setLoading(false);
      setAlertMessage({
        message: "Error loading repos. Please try again.",
        type: "danger"
      });
    }
  };

  const clearSearchResults = () => {
    setUsers([]);
    setLoading(false);
  };

  const setAlert = (message, type) => {
    setAlertMessage({ message, type });
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  return (
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
                  <Search
                    searchUsers={searchUsers}
                    setAlert={setAlert}
                    clearSearchResults={clearSearchResults}
                    showClearButton={users.length > 0 ? true : false}
                  />
                  <Users loading={loading} users={users} />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/user/:login"
              render={props => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  repos={repos}
                  user={user}
                  loading={loading}
                />
              )}
            />
            <Route exact path="/about" render={About} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;

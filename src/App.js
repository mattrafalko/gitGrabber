import React from "react";
import "./App.css";
import Navbar from "./Components/Layout/Navbar";
import Users from "./Components/Users/Users";
import User from "./Components/Users/User";
import Search from "./Components/Search/Search";
import axios from "axios";
import Alert from "./Components/Layout/Alert";
import About from "./Components/Pages/About";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  state = {
    loading: false,
    alert: null,
    users: [],
    user: {},
    repos: [],
  };

  // async componentDidMount() {
  //   try {
  //     this.setState({ loading: true });
  //     const github_data = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //     this.setState({ users: github_data.data, loading: false });
  //   } catch {
  //     this.setState({ loading: false });
  //   }
  // }

  searchUsers = async searchText => {
    try {
      this.setState({ loading: true });
      const github_data = await axios.get(
        `https://api.github.com/search/users?q=${searchText}&client_id=${
          process.env.REACT_APP_GITHUB_CLIENT_ID
        }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      this.setState({ users: github_data.data.items, loading: false });
    } catch {
      this.setState({ loading: false });
    }
  };

  getUser = async login => {
    try {
      this.setState({ loading: true });
      const github_data = await axios.get(
        `https://api.github.com/users/${login}?client_id=${
          process.env.REACT_APP_GITHUB_CLIENT_ID
        }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      this.setState({ user: github_data.data, loading: false });
    } catch {
      this.setState({ loading: false });
    }
  };

  getUserRepos =async (login)=>{
    try {
      this.setState({ loading: true });
      const github_data = await axios.get(
        `https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${
          process.env.REACT_APP_GITHUB_CLIENT_ID
        }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      this.setState({ repos: github_data.data, loading: false });
    } catch {
      this.setState({ loading: false });
    }
  }

  clearSearchResults = () => {
    this.setState({ users: [], loading: false });
  };

  setAlert = (message, type) => {
    this.setState({ alert: { message, type } });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 3000);
  };

  render() {
    const { users, loading, user, repos } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <React.Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      setAlert={this.setAlert}
                      clearSearchResults={this.clearSearchResults}
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
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
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
  }
}

export default App;

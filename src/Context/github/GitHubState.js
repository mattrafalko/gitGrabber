//State and Actions go in State file
import React, { useReducer } from "react";
import axios from "axios";
import GitHubContext from "./gitHubContext";
import GitHubReducer from "./GitHubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from "../../types";

const GitHubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GitHubReducer, initialState);

  //Search Users
  const searchUsers = async searchText => {
    try {
      setLoading();

      const github_data = await axios.get(
        `https://api.github.com/search/users?q=${searchText}&client_id=${
          process.env.REACT_APP_GITHUB_CLIENT_ID
        }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      dispatch({ type: SEARCH_USERS, payload: github_data.data.items });
    } catch {
      setLoading();
    }
  };
  //Get User
  const getUser = async login => {
    try {
      setLoading();
      const github_data = await axios.get(
        `https://api.github.com/users/${login}?client_id=${
          process.env.REACT_APP_GITHUB_CLIENT_ID
        }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      dispatch({ type: GET_USER, payload: github_data.data });
    } catch {
      setLoading(false);
    }
  };
  //Get Repos
  const getUserRepos = async login => {
    try {
      setLoading();
      const github_data = await axios.get(
        `https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&client_id=${
          process.env.REACT_APP_GITHUB_CLIENT_ID
        }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );
      dispatch({ type: GET_REPOS, payload: github_data.data });
    } catch {
      setLoading();
    }
  };
  //Clear Users
  const clearSearchResults = () => {
    dispatch({ type: CLEAR_USERS });
  };

  //Set Loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  return (
    <GitHubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearSearchResults,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </GitHubContext.Provider>
  );
};

export default GitHubState;

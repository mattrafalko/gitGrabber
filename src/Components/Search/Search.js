import React, { useState, useContext } from "react";
import AlertContext from "../../Context/alert/AlertContext";
import GitHubContext from "../../Context/github/gitHubContext";

const Search = () => {
  const gitHubContext = useContext(GitHubContext);
  const alertContext = useContext(AlertContext);

  const [searchText, setSearchText] = useState("");

  const onSearchChange = event => {
    setSearchText(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    if (searchText === "") {
      //setAlert("Search text cannot be blank", "light");
      alertContext.setAlert("light", "Search text cannot be blank");
    } else {
      gitHubContext.searchUsers(searchText);
      setSearchText("");
    }
  };

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          name="searchText"
          value={searchText}
          onChange={onSearchChange}
          placeholder="Search for Users"
        />
        <input
          type="submit"
          value="Search"
          className="btnn btn-dark btn-block"
        />
      </form>
      {gitHubContext.users.length > 0 ? (
        <button
          className="btn btn-light btn-block"
          onClick={gitHubContext.clearSearchResults}
        >
          Clear Results
        </button>
      ) : null}
    </div>
  );
};

export default Search;

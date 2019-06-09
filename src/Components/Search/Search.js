import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import GitHubContext from "../../Context/github/gitHubContext";

const Search = ({ setAlert }) => {
  const gitHubContext = useContext(GitHubContext);
  const [searchText, setSearchText] = useState("");

  const onSearchChange = event => {
    setSearchText(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    if (searchText === "") {
      setAlert("Search text cannot be blank", "light");
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

Search.propTypes = {
  setAlert: PropTypes.func.isRequired
};

export default Search;

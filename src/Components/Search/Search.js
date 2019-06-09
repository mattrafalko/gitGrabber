import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({
  searchUsers,
  showClearButton,
  clearSearchResults,
  setAlert
}) => {
  const [searchText, setSearchText] = useState("");

  const onSearchChange = event => {
    setSearchText(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    if (searchText === "") {
      setAlert("Search text cannot be blank", "light");
    } else {
      searchUsers(searchText);
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
      {showClearButton ? (
        <button
          className="btn btn-light btn-block"
          onClick={clearSearchResults}
        >
          Clear Results
        </button>
      ) : null}
    </div>
  );
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearSearchResults: PropTypes.func.isRequired,
  showClearButton: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default Search;

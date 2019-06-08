import React, { Component } from "react";
import PropTypes from 'prop-types'


export class Search extends Component {
  state = {
    searchText: ""
  };

  static propTypes= {
      searchUsers: PropTypes.func.isRequired,
      clearSearchResults: PropTypes.func.isRequired,
      showClearButton: PropTypes.bool.isRequired,
      setAlert: PropTypes.func.isRequired,
  }

  onSearchChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit= event =>{
    event.preventDefault();
    if(this.state.searchText === ''){
        this.props.setAlert('Search text cannot be blank', 'light');
    }
    else {
        this.props.searchUsers(this.state.searchText);
        this.setState({searchText: ''});
    }
  }

  render() {
      const {showClearButton, clearSearchResults} = this.props;
    return (
      <div>
        <form className="form" onSubmit={this.onSubmit}>
          <input
            type="text"
            name="searchText"
            value={this.state.searchText}
            onChange={this.onSearchChange}
            placeholder="Search for Users"
          />
          <input
            type="submit"
            value="Search"
            className="btnn btn-dark btn-block"
          />
        </form>
        {
        showClearButton ?
        <button className="btn btn-light btn-block" onClick={clearSearchResults}>Clear Results</button>
        : null
        }
      </div>
    );
  }
}

export default Search;

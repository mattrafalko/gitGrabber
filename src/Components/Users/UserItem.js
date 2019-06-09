import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserItem = ({ user: { login, avatar_url, html_url } }) => {
  return (
    <div className="card text-center">
      <img
        className="round-img"
        style={{ width: "6em" }}
        src={avatar_url}
        alt={`of the user ${login}`}
      />
      <h3>{login}</h3>
      <div>
        <Link className="btn btn-dark btn-sm my-2" to={`/user/${login}`}>
          {login}'s GitHub Profile
        </Link>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserItem;

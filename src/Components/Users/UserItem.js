import React from "react";
import PropTypes from "prop-types";

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
        <a className="btn btn-dark btn-sm my-1" href={html_url}>
          GitHub
        </a>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserItem;

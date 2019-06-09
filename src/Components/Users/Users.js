import React, { useContext } from "react";
import UserItem from "./UserItem";
import Spinner from "../Spinner/Spinner";
import PropTypes from "prop-types";
import GitHubContext from "../../Context/github/gitHubContext";

const Users = () => {
  const gitHubContext = useContext(GitHubContext);

  const { loading, users } = gitHubContext;

  if (loading) {
    return <Spinner />;
  }

  return (
    <div style={userStyle}>
      {users.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1em"
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Users;

import React, { useEffect, useContext } from "react";
import Spinner from "../Spinner/Spinner";
import Repos from "../Repos/Repos";
import { Link } from "react-router-dom";
import GitHubContext from "../../Context/github/gitHubContext";

const User = ({ match }) => {
  const githubContext = useContext(GitHubContext);

  useEffect(() => {
    githubContext.getUser(match.params.login);
    githubContext.getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    company,
    hireable
  } = githubContext.user;

  if (githubContext.loading) return <Spinner />;

  return (
    <React.Fragment>
      <Link to="/" className="btn btn-light">
        Back to Search
      </Link>
      Hireable:{" "}
      {hireable ? (
        <i className="fas fa-check text-success" />
      ) : (
        <i className="fas fa-times-circle text-danger" />
      )}
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatar_url}
            className="round-img"
            stype={{ width: "150px" }}
            alt=""
          />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <React.Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </React.Fragment>
          )}
          <a href={html_url} className="btn btn-dark my-1">
            GitHub Profile
          </a>
          <ul>
            <li>
              {login && (
                <React.Fragment>
                  <strong>Username: </strong>
                  {login}{" "}
                </React.Fragment>
              )}
            </li>
            <li>
              {company && (
                <React.Fragment>
                  <strong>Company: </strong>
                  {company}{" "}
                </React.Fragment>
              )}
            </li>
            <li>
              {blog && (
                <React.Fragment>
                  <strong>Website: </strong>
                  <a href={`https://${blog}`}> {blog} </a>
                </React.Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-light">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-danger">Public Repos: {public_repos}</div>
        <div className="badge badge-dark">Public Gists: {public_gists}</div>
      </div>
      <Repos repos={githubContext.repos} />
    </React.Fragment>
  );
};

export default User;

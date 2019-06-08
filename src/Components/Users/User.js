import React, { Component } from "react";
import Spinner from '../Spinner/Spinner';
import PropTypes from 'prop-types'
import Repos from '../Repos/Repos';
import {Link} from 'react-router-dom';

export class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
    this.props.getUserRepos(this.props.match.params.login)
  }

  static propTypes ={
      loading: PropTypes.bool,
      user: PropTypes.object.isRequired,
      getUser: PropTypes.func.isRequired,
      getUserRepos: PropTypes.func.isRequired,
      repos: PropTypes.array.isRequired,
  }

  render() {
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
    } = this.props.user;

    const { loading, repos } = this.props;

    if(loading) return <Spinner />

    return <React.Fragment>
        <Link to='/' className="btn btn-light">Back to Search</Link>
        Hireable: {''}
        {hireable ? <i className="fas fa-check text-success"/> : <i className="fas fa-times-circle text-danger"/>}
        <div className="card grid-2">
            <div className="all-center">
                <img src={avatar_url} className="round-img" stype={{width: "150px"}} alt=""/>
                <h1>{name}</h1>
                <p>Location: {location}</p>
            </div>
            <div>
                {bio && <React.Fragment>
                    <h3>Bio</h3>
                    <p>{bio}</p>
                </React.Fragment>}
                <a href={html_url} className="btn btn-dark my-1">GitHub Profile</a>
                <ul>
                <li>{login && <React.Fragment><strong>Username: </strong>{login} </React.Fragment>}</li>
                <li>{company && <React.Fragment><strong>Company: </strong>{company} </React.Fragment>}</li>
                <li>{blog && <React.Fragment><strong>Website: </strong>{blog} </React.Fragment>}</li>
                </ul>
            </div>
        </div>
        <div className="card text-center">
            <div className="badge badge-light">Followers: {followers}</div>
            <div className="badge badge-success">Following: {following}</div>
            <div className="badge badge-danger">Public Repos: {public_repos}</div>
            <div className="badge badge-dark">Public Gists: {public_gists}</div>
        </div>
        <Repos repos={repos}/>
    </React.Fragment>;
  }
}

export default User;

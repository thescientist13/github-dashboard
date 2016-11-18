import * as React from 'react';
import './user-details.css';
import { GithubApi, GithubUser } from '../../services/github-api';

class UserDetails extends React.Component<any, any> {
  state = {
    avatar: '',
    username: ''
  };

  constructor() {
    super();
    this.getUserDetails();
  }

  getUserDetails() {
    new GithubApi().getUserDetails().then((response: GithubUser) => {
      let user = response;

      this.setState({
        avatar: user.avatar,
        username: user.username
      });
    });
  }

  render() {
    return (
      <div className="user-details">
        <img className="user-avatar img-responsive" src={this.state.avatar}/>
        <h1><span className="user-name">{this.state.username}</span></h1>
      </div>
    )
  }

}

export default UserDetails;
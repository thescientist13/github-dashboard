'use strict';

import * as React from 'react';

import './user-details.css!';
import { GithubStore } from '../../stores/github/github-store';
import { GithubUser } from '../../stores/github/github-user';

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
    let store = new GithubStore();

    store.getUserDetails().then((response: GithubUser) => {
      const user = response.getDetails();

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
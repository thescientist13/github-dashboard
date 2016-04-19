'use strict';

import React from 'react';

import './user-details.css!';
import { GithubStore } from '../../stores/github/github-store';

class UserDetails extends React.Component {

  constructor() {
    super();

    this.state = {
      avatar: '',
      name: ''
    };

    this.getUserDetails();
  }

  getUserDetails() {
    let store = new GithubStore();

    store.getUserDetails().then(response => {
      this.setState(response.data);
    });
  }

  render() {
    return (
      <div className="user-details">
        <img className="user-avatar img-responsive" src={this.state.avatar}/>
        <h1><span className="user-name">{this.state.name}</span></h1>
      </div>
    )
  }

}

export default UserDetails;
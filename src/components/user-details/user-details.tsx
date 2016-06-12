'use strict';

import * as React from 'react';

import './user-details.css!';
import { GithubStore } from '../../stores/github/github-store';
import { GithubUser } from '../../stores/github/github-user';

class UserDetails extends React.Component<any, any> {
  private avatar:string;
  private name:string;

  constructor() {
    super();

    this.state = {
      avatar: '',
      user: ''
    }
  }

  componentWillMount() {
    this.getUserDetails();
  }

  getUserDetails() {
    let store = new GithubStore();

    store.getUserDetails().then((response: GithubUser) => {
      // TODO this works??  instead of response.getUserDetails
      const user = response;

      this.setState({
        avatar: user.avatar,
        name: user.username
      });
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
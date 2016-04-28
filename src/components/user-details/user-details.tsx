'use strict';

import * as React from 'react';

import './user-details.css!';
import { GithubStore } from '../../stores/github/github-store';

// TODO make this DRY?
interface MyProps {}
interface MyState {}

class UserDetails extends React.Component<MyProps, MyState> {
  private avatar:string;
  private name:string;

  constructor() {
    super();

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
        <img className="user-avatar img-responsive" src={this.avatar}/>
        <h1><span className="user-name">{this.name}</span></h1>
      </div>
    )
  }

}

export default UserDetails;
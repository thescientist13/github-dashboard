'use strict';

import './user-details.css!';
import { GithubStore } from '../../stores/github-store';
import React from 'react';

const UserDetails = React.createClass({

  getInitialState: function() {
    return {
      avatar: '',
      name: ''
    };
  },

  componentDidMount: function() {
    let store = new GithubStore();

    store.getUserDetails().then(response => {
      this.setState(response.data);
    });
  },

  render: function() {
    return (
      <div className="user-details">
        <img className="user-avatar img-responsive" src={this.state.avatar}/>
        <h1><span className="user-name">{this.state.name}</span></h1>
      </div>
    )
  }
});

export default UserDetails;
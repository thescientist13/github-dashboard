'use strict';

import './owner-details.css!';
import {GithubAPI} from '../github-api/github-api';
import React from 'react';

const OwnerDetails = React.createClass({

  getInitialState: function() {
    return {
      avatar: '',
      name: ''
    };
  },

  componentDidMount: function() {
    let api = new GithubAPI();

    api.getUserDetails(response => {
      this.setState({
        avatar: response.avatar_url,
        name: response.login
      });
    });
  },

  render: function() {
    return (
      <div>
        <img className="owner-avatar" src={this.state.avatar}/>
        <h1><span className="owner-name">{this.state.name}</span></h1>
      </div>
    )
  }
});

export default OwnerDetails;
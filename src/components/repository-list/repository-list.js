'use strict';

import {GithubAPI} from '../github-api/github-api';
import React from 'react';
import ReactDOM from 'react-dom';

var RepositoryList = React.createClass({
  getInitialState: function() {
    return {
      repositories: []
    };
  },

  componentDidMount: function() {
    let api = new GithubAPI();

    api.getUserRepositories(response => {
      this.setState({
       repositories: response
      });
    });
  },

  render: function() {
    return (
      <ul>
        {this.state.repositories.map(function(repository){
          return <li><a target="_blank" href={repository.html_url}>{repository.name}</a></li>
        })}
      </ul>
    )
  }
});

ReactDOM.render(
  <RepositoryList />,
  document.getElementById('repository-list')
);
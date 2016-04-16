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
      var repos = response;

      for(let i = 0, l = repos.length; i < l; i += 1){
        var repo = repos[i];

        api.getIssuesForRepository(repo.name, data => {
          repos[i].issues = data || [];

          // for(var j = 0, k = data.length; j < k; k += 1){
          //   console.debug('isPR', data[j].pull_request);
          // }

          if(i === (repos.length - 1)) {
            this.setState({
              repositories: repos
            });
          }
        });
      }

    });
  },

  render: function() {
    return (
      <table>
        <thead>
          <tr>
            <th>Repo Name</th>
            <th>Total Issues</th>
          </tr>
        </thead>
        <tbody>
          {this.state.repositories.map(function(repository){
            return <tr><td><a target="_blank" href={repository.html_url}>{repository.name}</a></td><td>{repository.issues.length}</td></tr>
          })}
        </tbody>
      </table>
    )
  }
});

ReactDOM.render(
  <RepositoryList />,
  document.getElementById('repository-list')
);
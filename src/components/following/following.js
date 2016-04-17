'use strict';

import React from 'react';
import {GithubStore} from '../github-store/github-store';

const Following = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      repositories: []
    };
  },

  // TOOD really need to clean this up
  componentDidMount: function() {
    let store = new GithubStore();

    store.getUserWatchedRepositories(response => {
      var repos = response;
      var availableRepos = [];
      var counter = 1;

      for(let i = 0, l = repos.length; i < l; i += 1){
        var repo = repos[i];
        counter += 1;

        store.getIssuesForUserWatchedRepositories(repo.owner.login, repo.name, data => {
          repo.issues = data || [];
          repo.pullRequests = 0;

          for(var j = 0, k = data.length; j < k; j += 1){
            if(data[j].pull_request) {
              repo.pullRequests += 1;
            }
          }

          repo.openIssues = repo.open_issues_count - repo.pullRequests;

          availableRepos.push(repo);

          if(counter === (repos.length - 1)) {
            this.setState({
              repositories: availableRepos
            });
          }
        });

      }

    });
  },

  render: function() {
    return (
      <table className="table table-bordered table-striped table-hover">
        <thead>
        <tr>
          <th>Repo Name</th>
          <th>Total Issues</th>
          <th>Pull Requests</th>
          <th>Open Issues</th>
        </tr>
        </thead>
        <tbody>
        {this.state.repositories.map(function(repository){
          return <tr key={repository.id}>
            <td><a target="_blank" href={repository.html_url}>{repository.name}</a></td>
            <td>{repository.open_issues_count}</td>
            <td>{repository.pullRequests}</td>
            <td>{repository.openIssues}</td>
          </tr>
        })}
        </tbody>
      </table>
    )
  }

});

export default Following;
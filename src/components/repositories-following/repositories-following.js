'use strict';

import GithubStore from '../../stores/github-store';
import React from 'react';
import TableRepositories from '../table-repositories/table-repositories';

const RepositoriesFollowing = React.createClass({

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
      <TableRepositories repositories={this.state.repositories}></TableRepositories>
    )
  }

});

export default RepositoriesFollowing;
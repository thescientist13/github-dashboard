'use strict';

import React from 'react';

import { GithubStore } from '../../stores/github-store';
import TableRepositories from '../table-repositories/table-repositories';

const RepositoriesPersonal = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      repositories: []
    };
  },

  componentDidMount: function() {
    let store = new GithubStore();

    store.getUserRepositories().then(response => {
      this.setState({
        repositories: response
      });

      this.state.repositories.map((repository, index) => {
        store.getIssuesForRepository(repository.name).then(response => {
          repository.issues = response.issues;
          repository.count = response.count;
          repository.pullRequests = response.pullRequests;
          repository.openIssues = response.openIssues;

          this.state.repositories[index] = repository;

          this.setState({
            repositories: this.state.repositories
          })
        })
      })
    });
  },

  render: function() {
    return (
      <TableRepositories repositories={this.state.repositories}></TableRepositories>
    )
  }

});

export default RepositoriesPersonal;
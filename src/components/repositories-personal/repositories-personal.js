'use strict';

import React from 'react';

import { GithubStore } from '../../stores/github/github-store';
import TableRepositories from '../table-repositories/table-repositories';

class RepositoriesPersonal extends React.Component {

  contextTypes: {
    router: React.PropTypes.object.isRequired
  };

  constructor() {
    super();

    this.state = {
      repositories: []
    };

    this.getUserRepositories();
  }

  getUserRepositories() {
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
  }

  render() {
    return (
      <TableRepositories repositories={this.state.repositories}></TableRepositories>
    )
  }

}

export default RepositoriesPersonal;
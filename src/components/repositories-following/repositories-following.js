'use strict';

import React from 'react';

import { GithubStore } from '../../stores/github/github-store';
import TableRepositories from '../table-repositories/table-repositories';

class RepositoriesFollowing extends React.Component {

  constructor() {
    super();

    this.state = {
      repositories: []
    };

    this.getUserSubscriptions();
  }

  getUserSubscriptions() {

    let store = new GithubStore();

    store.getUserSubscriptions().then(response => {
      this.setState({
        repositories: response
      });

      this.state.repositories.map((repository, index) => {
        store.getIssuesForRepository(repository.name, repository.owner.login).then(response => {
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

export default RepositoriesFollowing;
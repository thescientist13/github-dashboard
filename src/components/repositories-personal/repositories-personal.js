'use strict';

import React from 'react';

import { GithubStore } from '../../stores/github/github-store';
import TableRepositories from '../table-repositories/table-repositories';

class RepositoriesPersonal extends React.Component {

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
        //TODO this is duplicated in repositories-following, would be good to DRY this up.  maybe in the store?
        store.getIssuesForRepository(repository.name).then(response => {
          repository.issues = response.issues;
          repository.count = response.count;
          repository.pullRequests = response.pullRequests;
          repository.openIssues = response.openIssues;
          repository.hasAssignedIssues = response.hasAssignedIssues;

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
'use strict';

import * as React from 'react';

import { GithubStore } from '../../stores/github/github-store';
import { GithubIssue, GithubIssue } from "../../stores/github/github-issues";
import { GithubRepo, GithubRepos } from "../../stores/github/github-repos";
import TableRepositories from '../table-repositories/table-repositories';


// TODO make this DRY?
interface MyProps {}
interface MyState {}

class RepositoriesFollowing extends React.Component<MyProps, MyState> {
  private repositories: Array<GithubRepo> = [];

  contextTypes: {
    //router: React.PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.getUserSubscriptions();
  }

  getUserSubscriptions() {

    let store = new GithubStore();

    store.getUserSubscriptions().then(response => {
      this.setState({
        repositories: response
      });

      this.state.repositories.map((repository, index) => {
        //TODO this is duplicated in repositories-following, would be good to DRY this up
        store.getIssuesForRepository(repository.name, repository.owner.login).then(response => {
          repository.issues = response.issues;
          repository.count = response.count;
          repository.pullRequests = response.pullRequests;
          repository.openIssues = response.openIssues;
          repository.hasAssignedIssues = response.hasAssignedIssues;

          this.repositories[index] = repository;

          this.setState({
            repositories: this.repositories
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
'use strict';

import * as React from 'react';

import { GithubStore } from '../../stores/github/github-store';
import { GithubIssues } from "../../stores/github/github-issues";
import { GithubRepo, GithubRepos } from "../../stores/github/github-repos";
import TableRepositories from '../table-repositories/table-repositories';


class RepositoriesFollowing extends React.Component<any, any> {
  private repositories: Array<GithubRepo> = [];

  contextTypes: {
    //router: React.PropTypes.object.isRequired
  };

  constructor() {
    super();

    // this.setState({
    //   repositories: []
    // });

    this.getUserSubscriptions();
  }

  getUserSubscriptions() {
    let store = new GithubStore();

    store.getUserSubscriptions().then((response:GithubRepos) => {
      this.repositories = response.getRepos();
      // this.setState({
      //   repositories: response
      // });

      this.state.repositories.map((repository:GithubRepo, index: number) => {
        const repoInfo = repository.getRepoDetails();

        store.getIssuesForRepository(repoInfo.details.name, repoInfo.details.owner.login).then((response: GithubIssues) => {
          this.state.repositories.issues[index] = response;
          // this.setState({
          //   repositories: this.state.repositories
          // })
        })
      })
    });
  }


  render() {
    return (
      <TableRepositories repositories={this.repositories}></TableRepositories>
    )
  }

}

export default RepositoriesFollowing;
'use strict';

import * as React from 'react';

import { GithubIssues } from "../../stores/github/github-issues";
import { GithubRepo, GithubRepos } from "../../stores/github/github-repos";
import { GithubStore } from '../../stores/github/github-store';
import TableRepositories from '../table-repositories/table-repositories';

class RepositoriesPersonal extends React.Component<any, GithubRepo> {
  private repositories: Array<GithubRepo> = [];

  contextTypes: {
    //router: React.PropTypes.object.isRequired
  };

  constructor() {
    super();
    // this.setState({
    //   repositories: Array<GithubRepo>
    // }};

    this.getUserRepositories();
  }

  getUserRepositories() {
    let store = new GithubStore();

    store.getUserRepositories().then((response:GithubRepos) => {
      this.repositories = response.getRepos();
      // this.setState({
      //   repositories: response.getRepos()
      // });

      this.repositories.map((repository:GithubRepo, index:number) => {
        const repoInfo = repository.getRepoDetails();

        store.getIssuesForRepository(repoInfo.details.name).then((response: GithubIssues) => {
          this.repositories[index].setIssues(response);

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

export default RepositoriesPersonal;
'use strict';

import * as React from 'react';

import { GithubIssues } from "../../stores/github/github-issues";
import { GithubRepo } from "../../stores/github/github-repos";
import { GithubStore } from '../../stores/github/github-store';
import TableRepositories from '../table-repositories/table-repositories';

class RepositoriesPersonal extends React.Component<any, any >{
  state = {
    repositories: []
  };

  contextTypes: {
    //router: React.PropTypes.object.isRequired
  };

  constructor() {
    super();

    this.getUserRepositories();
  }

  getUserRepositories() {
    let store = new GithubStore();

    store.getUserRepositories().then((response: Array<GithubRepo>) => {
      var repos = response;

      repos.map((repository: GithubRepo, index: number) => {
        const repoInfo = repository.getRepoDetails();

        store.getIssuesForRepository(repoInfo.details.name, repoInfo.details.owner.login).then((response: GithubIssues) => {
          repos[index].setIssues(response);

          this.setState({
            repositories: repos
          });
        })
      });
    });
  }

  render() {
    return (
      <TableRepositories repositories={this.state.repositories}></TableRepositories>
    )
  }

}

export default RepositoriesPersonal;
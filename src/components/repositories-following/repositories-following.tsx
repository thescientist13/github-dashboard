'use strict';

import * as React from 'react';

import { GithubRepo, GithubRepos } from "../../stores/github/github-repos";
import { GithubStore } from '../../stores/github/github-store';
import TableRepositories from '../table-repositories/table-repositories';

class RepositoriesFollowing extends React.Component<any, any> {
  private repositories: Array<GithubRepo> = [];

  contextTypes: {
    //router: React.PropTypes.object.isRequired
  };

  constructor() {
    super();

    this.setState({
      repositories: []
    });

    this.getUserSubscriptions();
  }

  getUserSubscriptions() {
    let store = new GithubStore();

    store.getUserSubscriptions().then((response: GithubRepos) => {
      this.setState({
        repositories: response.getRepos()
      });
    });
  }


  // render() {
  //   return (
  //     <TableRepositories repositories={this.repositories}></TableRepositories>
  //   )
  // }

}

export default RepositoriesFollowing;
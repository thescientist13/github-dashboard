'use strict';

import * as React from 'react';

import { GithubRepo, GithubRepos } from "../../stores/github/github-repos";
import { GithubStore } from '../../stores/github/github-store';
import TableRepositories from '../table-repositories/table-repositories';

class RepositoriesPersonal extends React.Component<any, any> {
  //private repositories: Array<GithubRepo> = [];

  contextTypes: {
    //router: React.PropTypes.object.isRequired
  };

  constructor() {
    super();

    this.setState({
      repositories: []
    });

    this.getUserRepositories();
  }

  getUserRepositories() {
    let store = new GithubStore();

    store.getUserRepositories().then((response: GithubRepos) => {
      this.setState({
        repositories: response
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
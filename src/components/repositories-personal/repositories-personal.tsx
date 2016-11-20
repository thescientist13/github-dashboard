import * as React from 'react';
import { GithubApi, GithubIssuesInterface, GithubRepo } from '../../services/github-api';
import TableRepositories from '../table-repositories/table-repositories';

//TODO change use any, any to use types
class RepositoriesPersonal extends React.Component<any, any>{
  state = {
    repositories: []
  };

  constructor() {
    super();
    this.getUserRepositories();
  }

  getUserRepositories() {
    // const api = new GithubApi();
    //
    // api.getUserRepositories().then((response: Array<GithubRepo>) => {
    //   var repos = response;
    //
    //   repos.map((repository: GithubRepo, index: number) => {
    //     const repoInfo = repository;
    //
    //     api.getIssuesForRepository(repoInfo.details.name, repoInfo.details.owner.login).then((response: GithubIssuesInterface) => {
    //       repos[index].issues = response;
    //
    //       this.setState({
    //         repositories: repos
    //       });
    //     })
    //   });
    // });
  }

  render() {
    return (
      <TableRepositories repositories={this.state.repositories}></TableRepositories>
    )
  }

}

export default RepositoriesPersonal;
import * as React from 'react';
import { GithubApi, GithubIssues, GithubRepo } from '../../services/github-api';
import TableRepositories from '../table-repositories/table-repositories';

//TODO change use any, any to use types
class RepositoriesFollowing extends React.Component<any, any> {
  state = {
    repositories: []
  };

  constructor() {
    super();
    this.getUserSubscriptions();
  }

  getUserSubscriptions() {
    const api = new GithubApi();

    api.getUserSubscriptions().then((response: Array<GithubRepo>) => {
      var repos = response;

      repos.map((repository: GithubRepo, index: number) => {
        const repoInfo = repository;

        api.getIssuesForRepository(repoInfo.details.name, repoInfo.details.owner.login).then((response: GithubIssues) => {
          repos[index].issues = response;

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

export default RepositoriesFollowing;
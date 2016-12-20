import * as React from 'react';
import GithubStore from '../../stores/github-store';
import TableRepositories from '../table-repositories/table-repositories';

//TODO change use any, any to use types
class RepositoriesFollowing extends React.Component<any, any> {
  state = {
    repositories: []
  };

  constructor() {
    super();

    GithubStore.subscribe(() => {
      const state: any = GithubStore.getState();
      console.log('subscribe userSubscriptions', state.userSubscriptions);
      this.setState({
        repositories: state.userSubscriptions
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
import * as React from 'react';
import GithubStore from '../../stores/github-store';
import TableRepositories from '../table-repositories/table-repositories';

//TODO change use any, any to use types
class RepositoriesPersonal extends React.Component<any, any>{
  state = {
    repositories: []
  };

  constructor() {
    super();

    // GithubStore.subscribe(() => {
    //   const state: any = GithubStore.getState();
    //
    //   this.setState({
    //     repositories: state.userRepositories
    //   });
    // });
  }

  render() {
    return (
      <div>
        <h3>Personal Repositories</h3>
        <TableRepositories repositories={this.state.repositories}/>
      </div>
    )
  }

}

export default RepositoriesPersonal;
import * as React from 'react';
import { connect } from 'react-redux';
import { readUserRepositories } from '../../stores/github-store';

import RepositoriesTable from '../../components/repositories-table/repositories-table';


function mapStateToProps(state) {
  return {
    repositories: state.userRepositories,
    hasMoreRepos: state.hasMoreRepos,
    nextReposUrl: state.nextReposUrl
  };
}

//TODO change use any, any to use types
class Personal extends React.Component<any, any>{

  constructor(props) {
    super(props);

    this.state = {
      repositories: [],
      hasMoreRepos: false,
      nextReposUrl: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps nextProps personal', nextProps);
    this.setState({
      repositories: nextProps.repositories,
      hasMoreRepos: nextProps.hasMoreRepos,
      nextReposUrl: nextProps.nextReposUrl
    });
  }

  //this is here since if a component isnt mounted when dispatches to the store happen
  //the component will need to manually query the store to hydrate itself into state
  componentWillMount () {
    console.log('component will mount personal - read call');
    this.props.dispatch(readUserRepositories());
  }

  private getUserRepositoriesWithIssues(){
    console.log('TODO load more -> call up');
  }

  render() {
    return (
      <div>
        <h3>Personal Repositories</h3>
        <RepositoriesTable
          repositories={this.state.repositories}
          hasMoreRepos={this.state.hasMoreRepos}
          nextReposUrl={this.state.nextReposUrl}
          getNextRepos={this.getUserRepositoriesWithIssues.bind(this)}
        />
      </div>
    )
  }

}

export default connect(mapStateToProps)(Personal);
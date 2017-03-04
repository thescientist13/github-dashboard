import * as React from 'react';
import TableRepositories from '../table-repositories/table-repositories';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    repositories: state.userRepositories,
    hasMoreRepos: state.hasMoreRepos,
    nextReposUrl: state.nextReposUrl
  };
}

//TODO change use any, any to use types
class RepositoriesPersonal extends React.Component<any, any>{

  constructor(props) {
    super(props);

    this.state = {
      repositories: [],
      hasMoreRepos: false,
      nextReposUrl: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      repositories: nextProps.repositories || [],
      hasMoreRepos: nextProps.hasMoreRepos,
      nextReposUrl: nextProps.nextReposUrl
    });
  }

  //this is here since if a component isnt mounted when dispatches to the store happen
  //the component will need to manually query the store to hydrate itself into state
  componentWillMount () {
    this.setState({
      repositories: this.props.repositories,
      hasMoreRepos: this.props.hasMoreRepos,
      nextReposUrl: this.props.nextReposUrl
    });
  }

  render() {
    return (
      <div>
        <h3>Personal Repositories</h3>
        <TableRepositories
          repositories={this.state.repositories}
          hasMoreRepos={this.state.hasMoreRepos}
          nextReposUrl={this.state.nextReposUrl}
        />
      </div>
    )
  }

}

export default connect(mapStateToProps)(RepositoriesPersonal);
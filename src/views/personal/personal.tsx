import * as React from 'react';
import { connect } from 'react-redux';
import { readUserRepositories } from '../../stores/github-store';
import RepositoriesTable from '../../components/repositories-table/repositories-table';


function mapStateToProps(state) {
  return {
    repositories: state.userRepositories.repositories,
    nextReposUrl: state.userRepositories.nextReposUrl
  };
}

//TODO change use any, any to use types
export class PersonalRepositoriesView extends React.Component<any, any>{

  constructor(props) {
    super(props);

    this.state = {
      repositories: [],
      nextReposUrl: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      repositories: nextProps.repositories,
      nextReposUrl: nextProps.nextReposUrl
    });
  }

  componentWillMount () {
    this.props.dispatch(readUserRepositories());
  }

  private getNextUserRepositoriesWithIssues(){
    this.props.getNextUserRepositoriesWithIssues(this.state.nextReposUrl, this.state.repositories.length);
  }

  render() {
    return (
      <div>
        <h3>Personal Repositories</h3>
        <RepositoriesTable
          repositories={this.state.repositories}
          hasMoreRepos={this.state.nextReposUrl}
          getNextRepos={this.getNextUserRepositoriesWithIssues.bind(this)}
        />
      </div>
    )
  }

}

export default connect(mapStateToProps)(PersonalRepositoriesView);
import * as React from 'react';
import { connect } from 'react-redux';
import { readUserSubscriptions } from '../../stores/github-store';
import RepositoriesTable from '../../components/repositories-table/repositories-table';

function mapStateToProps(state) {
  return {
    repositories: state.userSubscriptions.repositories,
    nextReposUrl: state.userSubscriptions.nextReposUrl
  };
}

//TODO change use any, any to use types
export class FollowingRepositoriesView extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      repositories: [],
      nextReposUrl: null
    };
  }

  componentWillReceiveProps(nextProps) {
    //console.log('nextPROPS', nextProps);
    this.setState({
      repositories: nextProps.repositories,
      nextReposUrl: nextProps.nextReposUrl
    });
  }

  componentWillMount() {
    this.props.dispatch(readUserSubscriptions());
  }

  private getNextUserSubscriptionsWithIssues(){
    this.props.getNextUserSubscriptionsWithIssues(this.state.nextReposUrl, this.state.repositories.length);
  }

  render() {
    return (
      <div>
        <h3>Subscribed Repositories</h3>
        <RepositoriesTable
          repositories={this.state.repositories}
          hasMoreRepos={this.state.nextReposUrl}
          getNextRepos={this.getNextUserSubscriptionsWithIssues.bind(this)}
        />
      </div>
    )
  }

}

export default connect(mapStateToProps)(FollowingRepositoriesView);
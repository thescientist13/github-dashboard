import * as React from 'react';
import { connect } from 'react-redux';
import { readUserSubscriptions } from '../../stores/github-store';
import RepositoriesTable from '../../components/repositories-table/repositories-table';


function mapStateToProps(state) {
  return {
    repositories: state.userSubscriptions.repos,
    hasMoreRepos: state.userSubscriptions.hasMoreRepos,
    nextReposUrl: state.userSubscriptions.nextReposUrl
  };
}

//TODO change use any, any to use types
class Following extends React.Component<any, any> {
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
      repositories: nextProps.repositories,
      hasMoreRepos: nextProps.hasMoreRepos,
      nextReposUrl: nextProps.nextReposUrl
    });
  }

  componentWillMount() {
    this.props.dispatch(readUserSubscriptions());
  }

  private getUserSubscriptionsWithIssues(nextReposUrl: string, length: number){
    this.props.getNextUserSubsciptionsWithIssues(nextReposUrl, length);
  }

  render() {
    return (
      <div>
        <h3>Subscribed Repositories</h3>
        <RepositoriesTable
          repositories={this.state.repositories}
          hasMoreRepos={this.state.hasMoreRepos}
          nextReposUrl={this.state.nextReposUrl}
          getNextRepos={this.getUserSubscriptionsWithIssues.bind(this)}
        />
      </div>
    )
  }

}

export default connect(mapStateToProps)(Following);
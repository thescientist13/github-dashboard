import * as React from 'react';
import { connect } from 'react-redux';
import { readUserSubscriptions } from '../../stores/github-store';
import RepositoriesTable from '../../components/repositories-table/repositories-table';
import { RepositoryInterface } from "../../services/github-api";

interface FollowingPropsInterface {
  repositories: Array<RepositoryInterface>,
  nextReposUrl: string,
  getNextUserSubscriptionsWithIssues: any,
  dispatch: any
}

interface FollowingStateInterface {
  repositories: Array<RepositoryInterface>,
  nextReposUrl: string,
  hasMoreRepos: boolean
}

function mapStateToProps(state: any) {
  return {
    repositories: state.userSubscriptions.repositories,
    nextReposUrl: state.userSubscriptions.nextReposUrl
  };
}

export class FollowingRepositoriesView extends React.Component<FollowingPropsInterface, FollowingStateInterface> {

  constructor(props: FollowingPropsInterface) {
    super(props);

    this.state = {
      repositories: [],
      nextReposUrl: '',
      hasMoreRepos: false
    };
  }

  componentWillReceiveProps(nextProps: FollowingPropsInterface): void {
    this.setState({
      repositories: nextProps.repositories,
      nextReposUrl: nextProps.nextReposUrl,
      hasMoreRepos: !!nextProps.nextReposUrl
    });
  }

  componentWillMount(): void {
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
          hasMoreRepos={this.state.hasMoreRepos}
          getNextRepos={this.getNextUserSubscriptionsWithIssues.bind(this)}
        />
      </div>
    )
  }

}

export default connect(mapStateToProps)(FollowingRepositoriesView);
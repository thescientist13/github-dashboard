import * as React from 'react';
import TableRepositories from '../table-repositories/table-repositories';
import { connect } from 'react-redux';
import { Credentials, CredentialsInterface } from '../../services/credentials';
import { GithubApi, GithubIssuesInterface, GithubRepoInterface } from '../../services/github-api';
import { GITHUB_STORE_ACTIONS } from '../../stores/github-store';

function mapStateToProps(state) {
  return {
    repositories: state.userSubscriptions,
    hasMoreRepos: state.hasMoreRepos,
    nextReposUrl: state.nextReposUrl
  };
}

//TODO change use any, any to use types
class RepositoriesFollowing extends React.Component<any, any> {
  private credentials: CredentialsInterface;
  private githubApi: any;

  constructor(props) {
    super(props);

    this.state = {
      repositories: [],
      hasMoreRepos: false,
      nextReposUrl: ''
    };

    this.credentials = new Credentials().getCredentials();
    this.githubApi = new GithubApi(this.credentials);
    this.getUserSubscriptionsWithIssues();
  }

  private getUserSubscriptionsWithIssues(nextReposUrl?: string) {
    console.log('getUserSubscriptionsWithIssues', nextReposUrl);
    let dispatch = this.props.dispatch;

    this.githubApi.getUserSubscriptions(null, nextReposUrl).then((response: any) => {
      dispatch({
        type: GITHUB_STORE_ACTIONS.GET_NEXT_USER_SUBSCRIPTIONS,
        userSubscriptions: response.repos,
        hasMoreRepos: response.hasMoreRepos,
        nextReposUrl: response.nextReposUrl
      });

      // response.repos.map((repo: GithubRepoInterface, index: number) => {
      //   this.githubApi.getIssuesForRepository(repo.details.name, repo.details.owner.login).then((response: GithubIssuesInterface) => {
      //     dispatch({
      //       type: GITHUB_STORE_ACTIONS.GET_ISSUES_FOR_USER_SUBSCRIPTION,
      //       index: index,
      //       issues: response
      //     });
      //   })
      // })
    });
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
  componentWillMount() {
    this.setState({
      repositories: this.props.repositories,
      hasMoreRepos: this.props.hasMoreRepos,
      nextReposUrl: this.props.nextReposUrl
    });
  }

  render() {
    return (
      <div>
        <h3>Subscribed Repositories</h3>
        <TableRepositories
          repositories={this.state.repositories}
          hasMoreRepos={this.state.hasMoreRepos}
          nextReposUrl={this.state.nextReposUrl}
          getNextRepos={this.getUserSubscriptionsWithIssues.bind(this)}
        />
      </div>
    )
  }

}

export default connect(mapStateToProps)(RepositoriesFollowing);
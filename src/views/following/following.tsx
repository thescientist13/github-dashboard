import * as React from 'react';
import RepositoriesTable from '../../components/repositories-table/repositories-table';
import { connect } from 'react-redux';
import { Credentials, CredentialsInterface } from '../../services/credentials';
import { GithubApi, GithubIssuesInterface, GithubRepoInterface } from '../../services/github-api';
import { getUserSubscriptions , getIssuesForUserSubscription } from '../../stores/github-store';

function mapStateToProps(state) {
  console.log('mapStateToProps', state);
  return {
    repositories: state.userSubscriptions,
    hasMoreRepos: state.hasMoreRepos,
    nextReposUrl: state.nextReposUrl
  };
}

//TODO change use any, any to use types
class Following extends React.Component<any, any> {
  private credentials: CredentialsInterface;
  private githubApi: any;

  constructor(props) {
    super(props);

    this.credentials = new Credentials().getCredentials();
    this.githubApi = new GithubApi(this.credentials);
    this.state = {
      repositories: [],
      hasMoreRepos: false,
      nextReposUrl: ''
    };
  }

  private getUserSubscriptionsWithIssues(nextReposUrl?: string) {
    console.log('getUserSubscriptionsWithIssues state', this.state);
    console.log('getUserSubscriptionsWithIssues props', this.props);
    let dispatch = this.props.dispatch;
    let url: string = this.state.nextReposUrl ? this.props.nextReposUrl : nextReposUrl;
    this.githubApi.getUserSubscriptions(null, url).then((response: any) => {
      console.log('getUserSubscriptionsWithIssues response', response)
      dispatch(getUserSubscriptions(response));

      //TODO move offsetIdx logic into a central place
      // response.repos.forEach((repo: GithubRepoInterface, index: number) => {
      //   console.log('index', index);
      //   let offsetIdx = nextReposUrl ? ((this.state.repositories.length + index) - 30) : index;
      //   console.log('length', this.state.repositories.length);
      //   //console.log('division is hard', this.state.repositories.length / 30);
      //   console.log('offsetIdx', offsetIdx);
      //
      //   this.githubApi.getIssuesForRepository(repo.details.name, repo.details.owner.login).then((response: GithubIssuesInterface) => {
      //     dispatch(getIssuesForUserSubscription(response, offsetIdx));
      //   })
      // })
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps nextProps', nextProps);
    console.log('componentWillReceiveProps this.state', this.state);
    // this.setState({
    //   repositories: [],
    //   hasMoreRepos: false,
    //   nextReposUrl: ''
    // });
    this.setState({
      repositories: nextProps.repositories,
      hasMoreRepos: nextProps.hasMoreRepos,
      nextReposUrl: nextProps.nextReposUrl
    });
    console.log('componentWillReceiveProps newState', this.state);
  }

  //this is here since if a component isnt mounted when dispatches to the store happen
  //the component will need to manually query the store to hydrate itself into state
  componentWillMount() {
    console.log('component will mount');
    if(this.props.repositories.length === 0){
      console.log('with an API call');
      this.getUserSubscriptionsWithIssues();
    }else{
      console.log('componentWillMount props', this.props);
      console.log('componentWillMount state', this.state);
      //this.render();
      this.getUserSubscriptionsWithIssues();
      //this.setState({
      //   repositories: this.state.repositories,
      //   hasMoreRepos: this.state.hasMoreRepos,
      //   nextReposUrl: this.state.nextReposUrl
      // });
    }
  }

  // componentWillUnMount() {
  //   //console.log('componentWillMount props', this.props);
  //   console.log('componentWillMount state', this.state);
  //   this.setState({
  //     repositories: [],
  //     hasMoreRepos: false,
  //     nextReposUrl: ''
  //   });
  // }

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
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import { connect } from 'react-redux';
import { Credentials, CredentialsInterface } from '../../services/credentials';
import { GithubApi, GithubIssuesInterface, GithubRepoInterface } from '../../services/github-api';
import { GITHUB_STORE_ACTIONS } from '../../stores/github-store';
import Header from '../header/header';
import Footer from '../footer/footer';
import Navigation from '../navigation/navigation';
import UserDetails from '../user-details/user-details';

// TODO any
class Bootstrap extends React.Component<any, any> {
  private credentials: CredentialsInterface;
  private githubApi: any;

  private getUserDetails() {
    let dispatch = this.props.dispatch;

    this.githubApi.getUserDetails().then((response: any) => {
      dispatch({
        type: GITHUB_STORE_ACTIONS.GET_USER_DETAILS,
        userDetails: response
      })
    });
  }

  private getUserRepositoriesWithIssues() {
    let dispatch = this.props.dispatch;

    this.githubApi.getUserRepositories().then((response: any) => {
      dispatch({
        type: GITHUB_STORE_ACTIONS.GET_USER_REPOSITORIES,
        userRepositories: response.repos,
        hasMoreRepos: response.hasMoreRepos,
        nextReposUrl: response.nextReposUrl
      });

      response.repos.map((repo: GithubRepoInterface, index: number) => {
        this.githubApi.getIssuesForRepository(repo.details.name, repo.details.owner.login).then((response: GithubIssuesInterface) => {
          dispatch({
            type: GITHUB_STORE_ACTIONS.GET_ISSUES_FOR_USER_REPOSITORY,
            index: index,
            issues: response
          });
        })
      })
    });
  }

  private getUserSubscriptionsWithIssues() {
    let dispatch = this.props.dispatch;

    this.githubApi.getUserSubscriptions().then((response: any) => {
      dispatch({
        type: GITHUB_STORE_ACTIONS.GET_USER_SUBSCRIPTIONS,
        userSubscriptions: response.repos,
        hasMoreRepos: response.hasMoreRepos,
        nextReposUrl: response.nextReposUrl
      });

      response.repos.map((repo: GithubRepoInterface, index: number) => {
        this.githubApi.getIssuesForRepository(repo.details.name, repo.details.owner.login).then((response: GithubIssuesInterface) => {
          dispatch({
            type: GITHUB_STORE_ACTIONS.GET_ISSUES_FOR_USER_SUBSCRIPTION,
            index: index,
            issues: response
          });
        })
      })
    });
  }

  constructor(props) {
    super(props);

    this.credentials = new Credentials().getCredentials();
    this.githubApi = new GithubApi(this.credentials);

    this.getUserDetails();
    this.getUserRepositoriesWithIssues();
    this.getUserSubscriptionsWithIssues();
  }

  render() {
    return (
      <section>
        <section className="row">

          <div className="col-md-*">
            <Header/>
          </div>

        </section>

        <section className="row">

          <div className="col-md-3">
            <UserDetails/>
            <Navigation/>
          </div>

          <div className="col-md-9">
            {this.props.children}
          </div>

        </section>

        <section className="row">

          <div className="col-md-12">
            <Footer/>
          </div>

        </section>
      </section>
    )
  }
}

export default connect()(Bootstrap);
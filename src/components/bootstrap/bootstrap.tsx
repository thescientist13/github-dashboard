import * as React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Credentials, CredentialsInterface } from '../../services/credentials';
import { GithubApi, GithubIssuesInterface, GithubRepoInterface } from '../../services/github-api';
import { GITHUB_STORE_ACTIONS } from '../../stores/github-store';
import GithubStore from '../../stores/github-store';
import Header from '../header/header';
import Footer from '../footer/footer';
import UserDetails from '../user-details/user-details';
import Navigation from '../navigation/navigation';
import RepositoriesPersonal from '../repositories-personal/repositories-personal';
import RepositoriesFollowing from '../repositories-following/repositories-following';

// TODO make this DRY?
interface MyProps {}
interface MyState {}

class Bootstrap extends React.Component<MyProps, MyState> {
  private credentials: CredentialsInterface;
  private githubApi: any;

  private getUserDetails() {
    this.githubApi.getUserDetails().then((response: any) => {
      GithubStore.dispatch({
        type: GITHUB_STORE_ACTIONS.GET_USER_DETAILS,
        userDetails: response
      })
    });
  }

  private getUserRepositoriesWithIssues() {
    this.githubApi.getUserRepositories().then((response: any) => {
      GithubStore.dispatch({
        type: GITHUB_STORE_ACTIONS.GET_USER_REPOSITORIES,
        userRepositories: response
      });

      response.map((repo: GithubRepoInterface, index: number) => {
        this.githubApi.getIssuesForRepository(repo.details.name, repo.details.owner.login).then((response: GithubIssuesInterface) => {
          GithubStore.dispatch({
            type: GITHUB_STORE_ACTIONS.GET_ISSUES_FOR_USER_REPOSITORY,
            index: index,
            issues: response
          });
        })
      })
    });
  }

  private getUserSubscriptionsWithIssues() {
    this.githubApi.getUserSubscriptions().then((response: any) => {
      GithubStore.dispatch({
        type: GITHUB_STORE_ACTIONS.GET_USER_SUBSCRIPTIONS,
        userSubscriptions: response
      });

      response.map((repo: GithubRepoInterface, index: number) => {
        this.githubApi.getIssuesForRepository(repo.details.name, repo.details.owner.login).then((response: GithubIssuesInterface) => {
          GithubStore.dispatch({
            type: GITHUB_STORE_ACTIONS.GET_ISSUES_FOR_USER_SUBSCRIPTION,
            index: index,
            issues: response
          });
        })
      })
    });
  }

  constructor() {
    super();

    this.credentials = new Credentials().getCredentials();
    this.githubApi = new GithubApi(this.credentials);
  }

  componentDidMount() {
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
            {/*<Navigation/>*/}
          </div>

          <div className="col-md-9">
            <RepositoriesPersonal/>

            <hr/>

            <RepositoriesFollowing/>
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

export default Bootstrap;
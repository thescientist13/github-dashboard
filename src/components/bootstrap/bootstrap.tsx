import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import { connect } from 'react-redux';
import { Credentials, CredentialsInterface } from '../../services/credentials';
import { GithubApi, GithubRepoInterface, GithubIssuesInterface} from '../../services/github-api';
import { getUserDetails, getUserSubscriptions , getUserRepositories, getIssuesForUserRepository, getIssuesForUserSubscription } from '../../stores/github-store';
import Footer from '../footer/footer';
import Header from '../header/header';
import Navigation from '../navigation/navigation';
import UserDetails from '../user-details/user-details';

// TODO any
class Bootstrap extends React.Component<any, any> {
  private credentials: CredentialsInterface;
  private githubApi: any;

  constructor(props) {
    super(props);

    this.credentials = new Credentials().getCredentials();
    this.githubApi = new GithubApi(this.credentials);

    this.getUserDetails();
    this.getUserRepositoriesWithIssues();
    this.getUserSubscriptionsWithIssues();
  }

  private getUserDetails() {
    let dispatch = this.props.dispatch;

    this.githubApi.getUserDetails().then((response: any) => {
      dispatch(getUserDetails(response));
    });
  }

  private getUserRepositoriesWithIssues(nextReposUrl?: string) {
    let dispatch = this.props.dispatch;
    let url: string = nextReposUrl ? nextReposUrl : null;

    this.githubApi.getUserRepositories(url).then((response: any) => {
      dispatch(getUserRepositories(response));

      //TODO move offsetIdx logic into a central place
      response.repos.map((repo: GithubRepoInterface, index: number) => {
        let offsetIdx = nextReposUrl ? (this.state.repositories.length - 30) + index : index;

        this.githubApi.getIssuesForRepository(repo.details.name, repo.details.owner.login).then((response: GithubIssuesInterface) => {
          dispatch(getIssuesForUserRepository(response, offsetIdx));
        })
      })
    });
  }

  private getUserSubscriptionsWithIssues(nextReposUrl?: string) {
    let dispatch = this.props.dispatch;
    let url: string = nextReposUrl ? nextReposUrl : null;
    this.githubApi.getUserSubscriptions(url).then((response: any) => {
      dispatch(getUserSubscriptions(response));

      //TODO move offsetIdx logic into a central place
      response.repos.forEach((repo: GithubRepoInterface, index: number) => {
        //console.log('index', index);
        let offsetIdx = nextReposUrl ? (((this.state.repositories ? this.state.repositories.length : 0) + index) - 30) : index;
        //console.log('length', this.state.repositories.length);
        //console.log('division is hard', this.state.repositories.length / 30);
        //console.log('offsetIdx', offsetIdx);

        this.githubApi.getIssuesForRepository(repo.details.name, repo.details.owner.login).then((response: GithubIssuesInterface) => {
          dispatch(getIssuesForUserSubscription(response, offsetIdx));
        })
      })
    });
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
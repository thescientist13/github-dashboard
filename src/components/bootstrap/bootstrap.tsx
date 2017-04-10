import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import { connect } from 'react-redux';
import { Credentials, CredentialsInterface } from '../../services/credentials';
import { GithubApi, RepositoriesInterface, IssueDetailsInterface, UserInterface } from '../../services/github-api';
import { getUserDetails, getUserSubscriptions, getUserRepositories, getIssuesForUserRepository, getIssuesForUserSubscription } from '../../stores/github-store';
import Footer from '../footer/footer';
import Header from '../header/header';
import Navigation from '../navigation/navigation';
import UserDetails from '../user-details/user-details';

interface BootstrapPropsInterface {
  dispatch?: any
}
interface BootstrapStateInterface {
  userDetails: {
    username: string,
    avatar: string
  }
}

export class Bootstrap extends React.Component<BootstrapPropsInterface, BootstrapStateInterface> {
  private credentials: CredentialsInterface;
  private githubApi: GithubApi;

  constructor(props: BootstrapPropsInterface) {
    super(props);

    this.credentials = new Credentials().getCredentials();
    this.githubApi = new GithubApi(this.credentials);
    this.state = {
      userDetails: {
        username: '',
        avatar: ''
      }
    };

    this.getUserDetails();
    this.getUserRepositoriesWithIssues();
    this.getUserSubscriptionsWithIssues();
  }

  private getUserDetails(): void {
    const dispatch = this.props.dispatch;

    this.githubApi.getUserDetails().then((response: UserInterface) => {
      dispatch(getUserDetails(response));

      this.setState({
        userDetails: {
          username: response.username,
          avatar: response.avatar
        }
      })
    });
  }

  private getUserRepositoriesWithIssues(nextReposUrl?: string, length?: number): void {
    const dispatch = this.props.dispatch;
    const url: string = nextReposUrl ? nextReposUrl : null;

    this.githubApi.getUserRepositories(url).then((response: RepositoriesInterface) => {
      dispatch(getUserRepositories(response.repositories, response.nextReposUrl));

      response.repositories.map((repo: any, index: number) => {
        let offsetIdx = nextReposUrl && length ? length + index : index;

        this.githubApi.getIssuesForRepository(repo.name, repo.owner).then((response: IssueDetailsInterface) => {
          dispatch(getIssuesForUserRepository(response, offsetIdx));
        })
      })
    });
  }

  private getUserSubscriptionsWithIssues(nextReposUrl?: string, length?: number): void {
    const dispatch = this.props.dispatch;
    const url: string = nextReposUrl ? nextReposUrl : null;

    this.githubApi.getUserSubscriptions(url).then((response: RepositoriesInterface) => {
      dispatch(getUserSubscriptions(response.repositories, response.nextReposUrl));

      response.repositories.forEach((repo: any, index: number) => {
        let offsetIdx = nextReposUrl && length ? length + index : index;

        this.githubApi.getIssuesForRepository(repo.name, repo.owner).then((response: IssueDetailsInterface) => {
          dispatch(getIssuesForUserSubscription(response, offsetIdx));
        })
      })
    });
  }

  render() {
    const children = React.Children.map(this.props.children, (child: any) => {
      return React.cloneElement(child, {
        getNextUserRepositoriesWithIssues: this.getUserRepositoriesWithIssues.bind(this),
        getNextUserSubscriptionsWithIssues: this.getUserSubscriptionsWithIssues.bind(this)
      })
    });

    return (
      <section>
        <section className="row">

          <div className="col-md-*">
            <Header/>
          </div>

        </section>

        <section className="row">

          <div className="col-md-3">
            <UserDetails username={this.state.userDetails.username} avatar={this.state.userDetails.avatar}/>
            <Navigation/>
          </div>

          <div className="col-md-9">
            {children}
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
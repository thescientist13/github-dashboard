import * as React from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
//import { Credentials, CredentialsInterface } from '../../services/credentials';
//import { GithubApi } from '../../services/github-api';
//import { GITHUB_STORE_ACTIONS } from '../../stores/github-store';
//import GithubStore from '../../stores/github-store';
import Header from '../header/header';
import Footer from '../footer/footer';
import UserDetails from '../user-details/user-details';
import Navigation from '../navigation/navigation';
import RepositoriesPersonal from '../repositories-personal/repositories-personal';
import TableRepositories from '../table-repositories/table-repositories';

// TODO make this DRY?
interface MyProps {}
interface MyState {}

let userDetails = {
  avatar: 'https://avatars1.githubusercontent.com/u/895923?v=3&s=88',
  username: 'thescientist13'
};

let repositoriesPersonal = [{
  details: {
    id: 1,
    name: 'Github Dashboard',
    html_url: 'https://github.com/thescientist13/github-dashboard/',
  },
  issues: {
    hasAssignedIssues: true,
    count: 6,
    pullRequests: 4,
    openIssues: 2
  }
}, {
  details: {
    id: 2,
    name: 'Build Profiler Plugin',
    html_url: 'https://github.com/thescientist13/build-profiler-webpack-plugin',
  },
  issues: {
    hasAssignedIssues: true,
    count: 6,
    pullRequests: 3,
    openIssues: 3
  }
}];

let repositoriesFollowing = [{
  details: {
    id: 3,
    name: 'Keystone',
    html_url: 'https://github.com/kenzanlabs/keystone/',
  },
  issues: {
    hasAssignedIssues: true,
    count: 16,
    pullRequests: 1,
    openIssues: 15
  }
}];

class Bootstrap extends React.Component<MyProps, MyState> {
  //private credentials: CredentialsInterface;
  //private githubApi: any;

  constructor() {
    super();

    //this.credentials = new Credentials().getCredentials();
    //this.githubApi = new GithubApi(this.credentials);
  }

  // componentDidMount() {
  //   this.githubApi.getUserDetails().then((response: any) => {
  //     GithubStore.dispatch({
  //       type: GITHUB_STORE_ACTIONS.GET_USER_DETAILS,
  //       userDetails: response
  //     })
  //   });
  //
  //   this.githubApi.getUserRepositories().then((response: any) => {
  //     GithubStore.dispatch({
  //       type: GITHUB_STORE_ACTIONS.GET_USER_REPOSITORIES,
  //       userRepositories: response
  //     })
  //   });
  //
  //   this.githubApi.getUserSubscriptions().then((response: any) => {
  //     GithubStore.dispatch({
  //       type: GITHUB_STORE_ACTIONS.GET_USER_SUBSCRIPTIONS,
  //       userSubscriptions: response
  //     })
  //   });
  // }

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
            <UserDetails user={userDetails}/>
            {/*<Navigation/>*/}
          </div>

          <div className="col-md-9">
            <h3>Personal Repositories</h3>
            <TableRepositories repositories={repositoriesPersonal}/>

            <hr/>

            <h3>Following Repositories</h3>
            <TableRepositories repositories={repositoriesFollowing}/>
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
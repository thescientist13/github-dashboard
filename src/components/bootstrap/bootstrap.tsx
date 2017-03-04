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

  constructor(props) {
    super(props);

    this.credentials = new Credentials().getCredentials();
    this.githubApi = new GithubApi(this.credentials);

    this.getUserDetails();
  }


  private getUserDetails() {
    let dispatch = this.props.dispatch;

    this.githubApi.getUserDetails().then((response: any) => {
      dispatch({
        type: GITHUB_STORE_ACTIONS.GET_USER_DETAILS,
        userDetails: response
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
import * as React from 'react';

import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Credentials, CredentialsInterface } from '../../services/credentials';
import Footer from '../footer/footer';
import { GithubApi } from '../../services/github-api';
import { GITHUB_STORE_ACTIONS } from '../../stores/github-store';
import GithubStore from '../../stores/github-store';
import Header from '../header/header';
import Navigation from '../navigation/navigation';
import UserDetails from '../user-details/user-details';

// TODO make this DRY?
interface MyProps {}
interface MyState {}

class Bootstrap extends React.Component<MyProps, MyState> {

  constructor() {
    super();

    const credentials: CredentialsInterface = new Credentials().getCredentials();
    const api = new GithubApi(credentials);

    api.getUserDetails().then((response: any) => {
      GithubStore.dispatch({
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
            <Header></Header>
          </div>

        </section>

        <section className="row">

          <div className="col-md-3">
            <UserDetails></UserDetails>
            <Navigation></Navigation>
          </div>

          <div className="col-md-9">
            <div>{this.props.children}</div>
          </div>

        </section>

        <section className="row">

          <div className="col-md-12">
            <Footer></Footer>
          </div>
        </section>

      </section>
    )
  }

}

export default Bootstrap;
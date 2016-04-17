'use strict';

import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Link, Router, Route, browserHistory } from 'react-router';

import '../../jspm_packages/github/twbs/bootstrap@3.3.6/css/bootstrap.css!';

// TODO use custom elements?
import Following from './components/following/following';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Navigation from './components/navigation/navigation';
import UserDetails from './components/user-details/user-details';
import RepositoryList from './components/repository-list/repository-list';

const Bootstrap = React.createClass({
  render: function() {
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
});

render((
  <Router history={browserHistory}>
    <Route path="/" component={Bootstrap}>
      <IndexRoute component={RepositoryList} />
      <Route path="personal" component={RepositoryList} />
      <Route path="following" component={Following} />
    </Route>
  </Router>
), document.getElementById('content'));
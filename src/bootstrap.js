'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { IndexRoute, Link, Router, Route, browserHistory } from 'react-router';

import '../../jspm_packages/github/twbs/bootstrap@3.3.6/css/bootstrap.css!';

// TODO use custom elements?
import Following from './components/following/following';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Navigation from './components/navigation/navigation';
import OwnerDetails from './components/owner-details/owner-details';
import RepositoryList from './components/repository-list/repository-list';

const NotFound = React.createClass({
  render() {
    return <h2>Not found</h2>
  }
});

const Bootstrap = React.createClass({
  render: function() {
    return (
      <section>
        <section className="row">

          <div className="col-md-*">
            <section id="header"></section>
          </div>

        </section>

        <section className="row">

          <div className="col-md-3">
            <section id="owner-details"></section>
            <ul>
              <li><Link key="1" to="/personal">Personal</Link></li>
              <li><Link key="2" to="/following">Following</Link></li>
            </ul>
            // <section id="navigation"></section>
          </div>

          <div className="col-md-9">
            <div>{this.props.children}</div>
          </div>

        </section>

        <section className="row">

          <div className="col-md-12">
            <section id="footer"></section>
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
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
), document.getElementById('content'));

ReactDOM.render(
  <Header />,
  document.getElementById('header')
);

// ReactDOM.render(
//   <Navigation />,
//   document.getElementById('navigation')
// );

ReactDOM.render(
  <OwnerDetails />,
  document.getElementById('owner-details')
);

ReactDOM.render(
  <Footer />,
  document.getElementById('footer')
);
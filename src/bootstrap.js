'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import '../../jspm_packages/github/twbs/bootstrap@3.3.6/css/bootstrap.css!';

// TODO use custom elements?
import { Following } from './components/following/following';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Navigation } from './components/navigation/navigation';
import { OwnerDetails } from './components/owner-details/owner-details';
import { RepositoryList } from './components/repository-list/repository-list';

render((
  <Router history={browserHistory}>
    <Route path="/" component={RepositoryList}>
      <Route path="personal" component={RepositoryList}/>
      <Route path="following" component={Following}/>
    </Route>
  </Router>
), document.getElementById('content'));

ReactDOM.render(
  <Navigation />,
  document.getElementById('navigation')
);

ReactDOM.render(
  <Header />,
  document.getElementById('header')
);

ReactDOM.render(
  <Footer />,
  document.getElementById('footer')
);

ReactDOM.render(
  <OwnerDetails />,
  document.getElementById('owner-details')
);
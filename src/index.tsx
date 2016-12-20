import * as React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import Bootstrap from './components/bootstrap/bootstrap';
import RepositoriesFollowing from './components/repositories-following/repositories-following';
import RepositoriesPersonal from './components/repositories-personal/repositories-personal';

render((
  <Router history={browserHistory}>
    <Route path="/" component={Bootstrap}>
      <IndexRoute component={RepositoriesPersonal} />
      <Route path="personal" component={RepositoriesPersonal} />
      <Route path="following" component={RepositoriesFollowing} />
    </Route>
  </Router>
), document.getElementById('content'));
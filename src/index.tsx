import * as React from "react";
import { render } from 'react-dom';
import { IndexRoute, Link, Router, Route, browserHistory } from 'react-router';

import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Layout from './components/layout/layout';
import RepositoriesFollowing from './components/repositories-following/repositories-following';
import RepositoriesPersonal from './components/repositories-personal/repositories-personal';

render((
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      {/*<IndexRoute component={RepositoriesPersonal} />*/}
      {/*<Route path="personal" component={RepositoriesPersonal} />*/}
      {/*<Route path="following" component={RepositoriesFollowing} />*/}
    </Route>
  </Router>
), document.getElementById('content'));
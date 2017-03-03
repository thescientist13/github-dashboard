import * as React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { IndexRoute, Link, Router, Route, browserHistory } from 'react-router';
import githubStoreReducer from './stores/github-store';
import Bootstrap from './components/bootstrap/bootstrap';
import RepositoriesPersonal from './components/repositories-personal/repositories-personal';
import RepositoriesFollowing from './components/repositories-following/repositories-following';

const store = createStore(githubStoreReducer);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Bootstrap}>
        <IndexRoute component={RepositoriesPersonal} />
        <Route path="personal" component={RepositoriesPersonal} />
        <Route path="following" component={RepositoriesFollowing} />
      </Route>
    </Router>
  </Provider>,
document.getElementById('bootstrap'));
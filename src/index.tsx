import * as React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import githubStoreReducer from './stores/github-store';
import Bootstrap from './components/bootstrap/bootstrap';
import FollowingRepositoriesView from './views/following/following';
import PersonalRepositoriesView from './views/personal/personal';

const store = createStore(githubStoreReducer);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Bootstrap}>
        <IndexRoute component={FollowingRepositoriesView} />
        <Route path="personal" component={PersonalRepositoriesView} />
        <Route path="following" component={FollowingRepositoriesView} />
      </Route>
    </Router>
  </Provider>,
document.getElementById('bootstrap'));
import * as React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import githubStoreReducer from './stores/github-store';
import Bootstrap from './components/bootstrap/bootstrap';
import Following from './views/following/following';
import Personal from './views/personal/personal';

const store = createStore(githubStoreReducer);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Bootstrap}>
        <IndexRoute component={Following} />
        <Route path="personal" component={Personal} />
        <Route path="following" component={Following} />
      </Route>
    </Router>
  </Provider>,
document.getElementById('bootstrap'));
import * as React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import githubStoreReducer from './stores/github-store';
import routes from './routes';

const store = createStore(githubStoreReducer);

render(
  <Provider store={store}>
    <Router 
      history={browserHistory}
      routes={routes}>
    </Router>
  </Provider>,
  document.getElementById('bootstrap')
);
import * as React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Bootstrap from './components/bootstrap/bootstrap';
import githubStoreReducer from './stores/github-store';
import PropTypes = React.PropTypes;

const store = createStore(githubStoreReducer);

render(
  <Provider store={store}>
    <Bootstrap />
  </Provider>,
document.getElementById('bootstrap'));
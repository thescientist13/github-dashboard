import * as React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import Bootstrap from './components/bootstrap/bootstrap';
import RepositoriesFollowing from './components/repositories-following/repositories-following';
import RepositoriesPersonal from './components/repositories-personal/repositories-personal';


import { Provider } from 'react-redux';
//import { createStore } from 'redux';
//import githubStoreReducer from './stores/github-store';

//let githubStore = createStore(githubStoreReducer);

render(<Bootstrap />, document.getElementById('bootstrap'));

// render((
//   <Router history={browserHistory}>
//     <Route path="/" component={Bootstrap}>
//       <IndexRoute component={RepositoriesPersonal} />
//       <Route path="personal" component={RepositoriesPersonal} />
//       <Route path="following" component={RepositoriesFollowing} />
//     </Route>
//   </Router>
// ), document.getElementById('content'));
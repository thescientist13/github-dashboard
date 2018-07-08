import Bootstrap from './components/bootstrap/bootstrap';

// thanks to https://brotzky.co/blog/code-splitting-react-router-webpack-2/!
function handleRouteLoadingError(error: any) {
  throw new Error(`Dynamic page loading failed: ${error}`);
}

function loadRoute(cb: any) {
  return (module: any) => cb(null, module.default);
}

export default {
  path: '/',
  component: Bootstrap,
  indexRoute: {
    getComponent(location: any, cb: any) {
      import('./views/following/following')
        .then(loadRoute(cb))
        .catch(handleRouteLoadingError);
    }
  },
  childRoutes: [{
    path: '/following',
    getComponent(location: any, cb: any) {
      import('./views/following/following')
        .then(loadRoute(cb))
        .catch(handleRouteLoadingError);
    }
  }, {
    path: '/personal',
    getComponent(location: any, cb: any) {
      import('./views/personal/personal')
        .then(loadRoute(cb))
        .catch(handleRouteLoadingError);
    }
  }, {
    path: '*',
    getComponent(location: any, cb: any) {
      import('./views/following/following')
        .then(loadRoute(cb))
        .catch(handleRouteLoadingError);
    }
  }]
};
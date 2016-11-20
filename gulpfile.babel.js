//https://markgoodyear.com/2015/06/using-es6-with-gulp/
//Using gulp webserver because it was the best solution I found which support proxies (for the dev environment)
//and fallback 404 page (for serving index.html like an .htaccess file would)
import gulp from 'gulp';
import webserver from 'gulp-webserver';

const serverOptions = {
  fallback: './index.html',
  livereload: true,
  open: '/',
  proxies: [{
    source: '/api.github.com',
    target: 'http://api.github.com'  //change here to proxy to other environments, like prod
  }],
  root: './build/'
};

gulp.task('serve', function () {
  return gulp.src(serverOptions.root)
    .pipe(webserver(serverOptions));
});
'use strict';

var gulp = require('gulp');
var validatePipeline = require('pipeline-validate-js');
var webserver = require('gulp-webserver');

var serverOptions = {
  fallback: './index.html',
  livereload: true,
  open: '/',
  proxies: [{
    source: 'api.github.com/',
    target: 'http://api.github.com/'
  }],
  root: './'
};

gulp.task('lint', function () {
  gulp.src([
    './gulpfile.js',
    'src/**/*.js'
  ]).pipe(validatePipeline.validateJS());
});


gulp.task('serve', function () {

  return gulp.src(serverOptions.root)
    .pipe(webserver(serverOptions));

});

gulp.task('build', ['lint']);
gulp.task('run', ['serve']);
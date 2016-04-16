'use strict';

var gulp = require('gulp');
var taskLister = require('gulp-task-listing');
var validatePipeline = require('pipeline-validate-js');
var webserver = require('gulp-webserver');

var serverOptions = {
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

gulp.task('help', taskLister);
gulp.task('run', ['lint']);

gulp.task('default', ['help']);
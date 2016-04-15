'use strict';

var gulp = require('gulp');
var taskLister = require('gulp-task-listing');
var validatePipeline = require('pipeline-validate-js');
var webserver = require('gulp-webserver');

var serverOptions = {
  livereload: true,
  open: '/',
  // proxies: [{
  //   source: '/api',
  //   target: 'http://analogstudios.thegreenhouse.io/api'
  // }],
  root: './'
};

gulp.task('lint', function () {
  gulp.src([
    './gulpfile.js'
  ]).pipe(validatePipeline.validateJS());
});


gulp.task('serve', function () {

  return gulp.src(serverOptions.root)
    .pipe(webserver(serverOptions));

});

gulp.task('help', taskLister);
gulp.task('build', ['lint']);

gulp.task('default', ['help']);
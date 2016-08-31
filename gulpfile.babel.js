'use strict';
console.log('hello world');
import gulp from 'gulp';
import handymanPipeline from 'pipeline-handyman';
import runSequence from 'run-sequence';
import sourcemaps from 'gulp-sourcemaps';
import taskListing from 'gulp-task-listing';
import tsCompiler from 'gulp-typescript';
import validatePipeline from 'pipeline-validate-js';
import webserver from 'gulp-webserver';


const serverOptions = {
  fallback: './index.html',
  livereload: true,
  open: '/',
  proxies: [{
    source: 'api.github.com/',
    target: 'http://api.github.com/'
  }],
  root: './dest/'
};

//phases - private tasks//
gulp.task('clean', function() {
  return handymanPipeline.clean(['./dest/']);
});

gulp.task('lint:js', function () {
  return gulp.src([
    './gulpfile.babel.js'
  ]).pipe(validatePipeline.validateJS());
});

gulp.task('compile:ts', function () {
  var tsProject = tsCompiler.createProject('tsconfig.json');

  return tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsCompiler(tsProject))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dest/'));
});

gulp.task('copy:css', function() {
  return gulp.src('./src/**/**/*.css')
    .pipe(gulp.dest('./dest/'));
});

gulp.task('copy:config', function() {
  return gulp.src('./config.js')
    .pipe(gulp.dest('./dest/'));
});

gulp.task('copy:html', function() {
  return gulp.src('./src/layouts/index.html')
    .pipe(gulp.dest('./dest/'));
});

gulp.task('copy:vendor', function() {
  return gulp.src('./jspm_packages/**/**')
    .pipe(gulp.dest('./dest/jspm_packages'));
});

gulp.task('watch', function() {
  gulp.watch(['./src/**/**/*.ts*'], ['compile:ts']);
});


gulp.task('build', ['clean'], function () {
  return runSequence(
    ['lint:js'],
    ['compile:ts'],
    ['copy:css', 'copy:vendor', 'copy:html', 'copy:config']
  );
});


gulp.task('serve', function () {
  return gulp.src(serverOptions.root)
    .pipe(webserver(serverOptions));
});

//lifecycles - public tasks//
//TODO make these work with serve :/
gulp.task('help', taskListing);
gulp.task('develop', ['build', 'watch']);
//gulp.task('run', ['build']);

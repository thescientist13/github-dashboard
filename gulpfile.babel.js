'use strict';

import gulp from 'gulp';
import handymanPipeline from 'pipeline-handyman';
import runSequence from 'run-sequence';
import sourcemaps from 'gulp-sourcemaps';
import tsCompiler from 'gulp-typescript';
import validatePipeline from 'pipeline-validate-js';
import webserver from 'gulp-webserver';

const serverOptions = {
  livereload: true,
  open: '/',
  proxies: [{
    source: 'api.github.com/',
    target: 'http://api.github.com/'
  }],
  root: './'
};

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

gulp.task('develop', ['clean'], function () {
  return runSequence(
    ['lint:js'],
    ['compile:ts'],
    ['copy:css', 'copy:vendor', 'copy:html', 'copy:config'],
    ['watch']
  );
});

gulp.task('serve', ['build'], function () {
  return gulp.src(serverOptions.root)
    .pipe(webserver(serverOptions));
});

gulp.task('watch', function() {
  gulp.watch(['./src/**/**/*.ts*'], ['compile:ts']);
});

gulp.task('develop', ['clean'], function () {
  return runSequence(
    ['lint:js'],
    ['compile:ts'],
    ['copy:css', 'copy:vendor', 'copy:html', 'copy:config']
  );
});

// TODO develop and run tasks
// TODO fix gulp-webserver
// "public" tasks
// gulp.task('develop', ['serve', 'watch']);
// gulp.task('run', ['serve']);
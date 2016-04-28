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

gulp.task('watch', function() {
  gulp.watch(['./src/**/**/*.ts*'], ['compile']);
});

gulp.task('serve', function () {

  return gulp.src(serverOptions.root)
    .pipe(webserver(serverOptions));

});

// "public" tasks
gulp.task('develop', ['build'], function () {
  return runSequence(
    ['serve', 'watch']
  );
});

gulp.task('build', ['clean'], function () {
  runSequence(
    ['lint:js'],
    ['compile:ts', 'copy:css']
  );
});

// gulp.task('serve', ['build'], function() {
//   return runSequence(['serve']);
// });
'use strict';

import gulp from 'gulp';
import handymanPipeline from 'pipeline-handyman';
import runSequence from 'run-sequence';
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

gulp.task('serve', function () {

  return gulp.src(serverOptions.root)
    .pipe(webserver(serverOptions));

});

gulp.task('compile', function () {
  var tsProject = tsCompiler.createProject('tsconfig.json');

  var tsResult = tsProject.src() // instead of gulp.src(...)
    .pipe(tsCompiler(tsProject));

  return tsResult.js.pipe(gulp.dest('dest/'));
});

gulp.task('build', ['clean'], function () {
  runSequence(
    ['lint:js'],
    ['compile']
  );
});

gulp.task('develop', ['build'], function () {
  return runSequence(
    ['serve', 'watch']
  );
});

gulp.task('run', ['build'], function() {
  return runSequence(['serve']);
});

gulp.task('watch', function() {
  gulp.watch(['./src/**/**/*.ts*'], ['compile']);
});

// TODO "copy:credentials": "rm -rf ./dest/* && cp ./src/credentials.js ./dest/",
// TODO "install:typings": "./node_modules/.bin/typings install",
// TODO "build": "./node_modules/typescript/bin/tsc",
// TODO "develop": "npm run copy:credentials && ./node_modules/typescript/bin/tsc -w",
// TODO "dashboard": "npm run copy:credentials && npm run build && npm run serve"
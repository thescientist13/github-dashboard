'use strict';

var gulp = require('gulp');
var taskLister = require('gulp-task-listing');
var validatePipeline = require('pipeline-validate-js');

gulp.task('lint', function () {
  gulp.src([
    './gulpfile.js'
  ]).pipe(validatePipeline.validateJS());
});

gulp.task('help', taskLister);
gulp.task('build', ['lint']);

gulp.task('default', ['help']);
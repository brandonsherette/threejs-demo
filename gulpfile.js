'use strict';

var config = require('./gulp.config')();
var gulp = require('gulp');

var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('serve', function() {
  var nodeOptions = getNodeOptions();

  return $.nodemon(nodeOptions)
    .on('restart', [], function() {
      console.log('*** NODEMON RESTARTED');
    })
    .on('start', function() {
      log('*** NODEMON STARTED');
      startBrowserSync();
    })
    .on('crash', function() {
      console.log('*** NODEMON CRASHED')
    })
    .on('exit', function() {
      console.log('*** NODEMON EXITED');
    })
});

///////////////////////

/**
 * Gets the node server options.
 */
function getNodeOptions() {
  return {
    script: config.nodeServer,
    delayTime: 1,
    watch: [config.server]
  };
}

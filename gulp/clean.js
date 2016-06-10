'use strict';

var gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	$ = gulpLoadPlugins();

module.exports = function(options) {
return function() {
	return gulp.src(options.src)
		.pipe($.clean())
	};
};
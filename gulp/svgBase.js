'use strict';

var gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	$ = gulpLoadPlugins(),
	multipipe = require('multipipe');

module.exports = function(options) {//options.src||options.dest

	return function() {
		return multipipe (
			gulp.src(options.src),
			$.svgToCss('svgBase64.less'),
			gulp.dest(options.dest)
		);
	};

};
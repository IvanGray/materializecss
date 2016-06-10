'use strict';

var gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	$ = gulpLoadPlugins(),
	multipipe = require('multipipe'),
	browserSync = require('browser-sync').create();

module.exports = function(options) {//options.src||options.dest

	return function() {
		return multipipe (
			gulp.src(options.src),
			$.cssnano(),//минификация css файла
			$.rename('style.min.css'),//переименовываем в style.css
			gulp.dest(options.dest)
		);
	};

};
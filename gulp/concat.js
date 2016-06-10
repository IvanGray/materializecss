'use strict';

var gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	$ = gulpLoadPlugins(),
	notify = require('gulp-notify'),
	multipipe = require('multipipe');

module.exports = function(options) {//options.src||options.dest

	return function() {
		return multipipe (
			gulp.src(options.src),
			$.plumber({
				errorHandler: notify.onError(function(err){
					return{
						title: 'js:concat',
						massage:err.massage
					};
				})
			}),
			$.concat(options.name),
			gulp.dest(options.dest),
			$.uglify(),
			$.rename({
				extname: '.min.js'
			}),
			gulp.dest(options.destMin),
			notify("JS concat!")
		);
	};

};
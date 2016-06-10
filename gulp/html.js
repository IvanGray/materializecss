'use strict';

var gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	$ = gulpLoadPlugins(),
	//HTML
	include = require('gulp-file-include'),
	notify = require('gulp-notify'),
	multipipe = require('multipipe');

module.exports = function(options) {

	return function() {
		return multipipe (
			gulp.src(options.src),
			$.plumber({
				errorHandler: notify.onError(function(err){
					return{
						title: 'html:include',
						massage:err.massage
					};
				})
			}),
			include({
				prefix: '@@',
				basepath: '@file'
			}),
			$.debug({title:'html:include'}),
			gulp.dest(options.dest)
		);
	};

};
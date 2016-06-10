'use strict';

var gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	$ = gulpLoadPlugins(),
	browserSync = require('browser-sync').create();

module.exports = function(options) {
	return function() {
		browserSync.init({
			server: "./dest"
		});
		browserSync.watch("dest/images/**/*.*").on("change", browserSync.reload);
		browserSync.watch("dest/js/*.js").on("change", browserSync.reload);
		browserSync.watch("dest/css/*.css", function (event, file) {
			if (event === "change") {
				browserSync.reload("*.css");
			}
		});
		gulp.watch("dest/*.html").on('change', browserSync.reload);
	};
};
'use strict';

var gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	$ = gulpLoadPlugins(),
	// СТИЛИ
	cssScss = require('gulp-css-scss'),
	cleanCSS = require('gulp-clean-css'),
	notify = require('gulp-notify'),
	multipipe = require('multipipe');

module.exports = function(options) {//options.src||options.dest

	return function() {
		return multipipe (
			gulp.src(options.src),//берем сам main.less
			$.debug({title:'src'}),
			$.plumber({
				errorHandler: notify.onError(function(err){
					return{
						title: 'CSS Error!!!',
						massage:err.massage
					};
				})
			}),//проверяем на ошибки, если ошибка возникает , выводим сообщение
			$.cssScss(),
			gulp.dest(options.destSass),//сохраняем все в dest

			$.debug({title:'dest'})
		);
	};

};
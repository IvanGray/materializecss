'use strict';

var gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	$ = gulpLoadPlugins(),
	// СТИЛИ
	cleanCSS = require('gulp-clean-css'),
	cmq = require('gulp-combine-media-queries'),
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
						title: 'LESS ERROR!!!',
						massage:err.massage
					};
				})
			}),//проверяем на ошибки, если ошибка возникает , выводим сообщение
			$.sass(),//компилируем less файл
			$.autoprefixer({
				browsers: ['last 10 versions'],
				cascade: false
			}),
			$.csscomb(),
			cmq(),
			gulp.dest(options.dest),//сохраняем все в dest
			$.debug({title:'dest'}),

			cleanCSS(),//минификация css файла
			$.rename({
				extname: '.min.css'
			}),//переименовываем в style.css
			gulp.dest(options.dest),
			$.debug({title:'dest'})
		).on('error', notify.onError());//если ошибка произошла
	};

};
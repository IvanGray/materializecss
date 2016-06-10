'use strict';
// ////////////////////////////////////////////////
//
// GULP СБОРКА ДЛЯ ВЕРСТКИ САЙТОВ
//
// // /////////////////////////////////////////////


// ПОДКЛЮЧАЕМ ПЛАГИНЫ
var gulp = require('gulp'),
	// РАБОТАЕМ С ПРОИЗВОДИТЕЛЬНОСТЬЮ СБОРКИ
	gulpLoadPlugins = require('gulp-load-plugins'),
	$ = gulpLoadPlugins(),
	gulpIf = require('gulp-if'),
	spritesmith = require('gulp.spritesmith'),
	runSequence = require('run-sequence');

// PATHS - ПУТИ К ФАЙЛАМ
var paths = require('./gulp/paths');

console.log($);

// ПОДКЛЮЧАЕМ ОТДЕЛЬНО TASKS
function lazyRequireTask(taskName, path, options) {
  options = options || {};
  options.taskName = taskName;
  gulp.task(taskName, function(callback) {
	var task = require(path).call(this, options);

	return task(callback);
  });
}

//ОЧИСТКА ПАПКИ
lazyRequireTask('clean', './gulp/clean', {
  src: paths.dest
});

//АРХИВ ПАПКИ
lazyRequireTask('zip', './gulp/zip', {
  src: paths.allDev,
  dest: paths.dest
});

//FTP
lazyRequireTask('ftp', './gulp/ftp', {
  src: paths.allDev
});


//include все файлы html в одну папку
lazyRequireTask('html', './gulp/html', {
	src: paths.html.src,
	dest: paths.html.dest
});

//СТИЛИ

//css
lazyRequireTask('css2less', './gulp/css2less', {
	src: paths.css.less.src,
	destLess: paths.css.less.dest
});
lazyRequireTask('css2sass', './gulp/css2sass', {
	src: paths.css.sass.src,
	destSass: paths.css.sass.dest
});


//less
lazyRequireTask('less', './gulp/less', {
	src: paths.less.main,
	dest: paths.less.dest
});

//less jquery
lazyRequireTask('less:jquery', './gulp/less', {
	src: paths.less.jquery,
	dest: paths.less.dest
});


//less files
lazyRequireTask('less-files', './gulp/less-files', {
	src: paths.less.all,
	dest: paths.less.dest
});

//less2sass
lazyRequireTask('less2sass', './gulp/less2sass', {
	src: paths.less.toSass,
	dest: paths.sass.scss.less
});

//sass
lazyRequireTask('sass', './gulp/sass', {
	src: paths.sass.scss.main,
	dest: paths.sass.dest
});
//sass:material
lazyRequireTask('sass:material', './gulp/sass', {
	src: paths.sass.scss.material,
	dest: paths.sass.dest
});
//JS:concat
lazyRequireTask('concat', './gulp/concat', {
	name: 'materialize.js',
	src: paths.js.material,
	dest: paths.js.dest,
	destMin: paths.js.dest
});

//JS
lazyRequireTask('js', './gulp/js', {
	src: paths.js.main,
	dest: paths.js.dest
});

//JS:jquery plugins
lazyRequireTask('js:juery', './gulp/js', {
	src: paths.js.jquery,
	dest: paths.js.dest
});

//minify js files
lazyRequireTask('js:min', './gulp/minjs', {
	src: paths.js.include,
	dest: paths.js.min
});

//SVG SPRITE
lazyRequireTask('svg', './gulp/svg', {
  src: paths.svg.src,
});

//SVG SPRITE BASE 64
lazyRequireTask('svg:base', './gulp/svgBase', {
	src: paths.svg.src,
	dest: paths.svg.base64
});


//sprites
gulp.task('sprite', function () {
	var spriteData = gulp.src('src/images/sprite/*')
		.pipe(spritesmith({
			imgName: 'sprite.png',
			cssName: 'spritePNG.less',
			imgPath:'../images/icons/sprite.png',
			padding: 15
		})
	);

var imgStream = spriteData.img
	.pipe(gulp.dest('dest/images/icons'));

var cssStream = spriteData.css
	.pipe(gulp.dest('src/less'));

});

//server
lazyRequireTask('server', './gulp/server', {});


// gulp watch
gulp.task('watch', function () {
	// html
	$.watch(paths.html.all, function () {
		gulp.start('html');
	});
	// less
	$.watch(paths.less.all, function () {
		gulp.start('less'),
		gulp.start('less:jquery');
	});
	// less2sass
	$.watch(paths.less.toSass, function () {
		gulp.start('less2sass');
	});
	// css2less
	$.watch(paths.less.src, function () {
		gulp.start('css2sass'),
		gulp.start('css2less');
	});
	// sass
	$.watch(paths.sass.scss.all, function () {
		gulp.start('sass');
	});
	// sass material
	$.watch(paths.sass.scss.materialComponents, function () {
		gulp.start('sass:material');
	});
	// js
	$.watch(paths.js.all, function () {
		gulp.start('js'),
		gulp.start('js:juery');
	});
	// js concat
	$.watch(paths.js.material, function () {
		gulp.start('concat')
	});
	// svg:base
	$.watch(paths.svg.src, function () {
		gulp.start('svg:base');
	});
	// png
	$.watch(paths.sprite.src, function () {
		gulp.start('sprite');
	});
	// js:min
	gulp.watch('src/js/include/**/*.js', ['js:min']).on('change', function(event){
		if (event.type === 'deleted') {
			// delete cached.caches['svg'][event.path];
			$.remember.forget('js:min', event.path);
		}
	});
	// svg
	gulp.watch('src/svg/*.svg', ['svg']).on('change', function(event){
		if (event.type === 'deleted') {
			// delete cached.caches['svg'][event.path];
			$.remember.forget('svg', event.path);
		}
	});
});



gulp.task('run:less', function() {
	return runSequence(
			['html', 'less','svg', 'svg:base','js', 'sprite'],
			['js:min']
		);
});

gulp.task('run:sass', function() {
	return runSequence(
			['html', 'sass','svg', 'svg:base','js', 'sprite'],
			['js:min']
		);
});

// less
// gulp.task('default',['run:less','watch','server']);

// sass
gulp.task('default',['run:sass','watch','server']);
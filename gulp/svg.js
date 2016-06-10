'use strict';

var gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	$ = gulpLoadPlugins(),
	gulpIf = require('gulp-if'),
	notify = require('gulp-notify'),
	multipipe = require('multipipe');

module.exports = function(options) {//options.src||options.dest

	return function() {
		return multipipe (
			$.newer('dest/images/icons/'),
			gulp.src(options.src),
			// cached('svg'),
			$.remember('svg'),
			$.svgSprite({
			mode: {
			  css: {
			    dest:       '.', // where to put style && sprite, default: 'css'
			    bust:       false,
			    sprite:     '../images/icons/sprite.svg', // filename for sprite relative to dest
			    layout:     'vertical',
			    prefix:     '.icon-', // .svg-
			    dimensions: true,
			    render:     {
			      scss: {
			        dest: 'spriteSVG.scss'  // filename for .styl relative to dest^
			      },
			      less: {
			        dest: 'spriteSVG.less'  // filename for .styl relative to dest^
			      }
			    }
			  }
			}
			}),
			$.debug({title:'svg'}),
			gulpIf('*.less', gulp.dest('./src/less')),
			gulpIf('*.scss',gulp.dest('./src/sass')),
			gulpIf('*.svg',gulp.dest('./dest/images/icons')),
			notify("SVG SPRITE DONE!")
		);
	};

};
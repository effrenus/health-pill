'use strict';

var gulp = require('gulp');
var webpack = require('gulp-webpack');
var webpack_config = require('./webpack.config.js');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
  	host: '192.168.0.101',
    root: [__dirname],
    livereload: true
  });
});

gulp.task('webpack', function(){
	gulp.src('./src/js/app.js')
		.pipe(webpack(webpack_config))
		.pipe(gulp.dest('./dist/js/'))
		.pipe(connect.reload());
});

gulp.task('sass', function(){
	gulp.src('./src/sass/**/*.{sass,scss}')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
            browsers: ['last 2 versions', 'iOS >= 7'],
            cascade: false
        }))
		.pipe(gulp.dest('./dist/css/'))
		.pipe(connect.reload());
});

gulp.task('watch', ['connect'], function(){
	gulp.watch('./src/sass/**/*.{sass,scss}', ['sass']);
	gulp.watch('./src/js/**/*.js', ['webpack']);
});

gulp.task('default', ['webpack']);
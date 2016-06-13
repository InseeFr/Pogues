var gulp = require('gulp');
var del = require('del');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.production.config');
// DEL
gulp.task('del:dist', function (callback) {
  del([
    './dist/index.html',
    './dist/css/**',
    './dist/js/**',
    './dist/img/**',
    './dist/fonts/**'
    ],
     callback);
});

// BUILD
gulp.task('build:copy:index', ['del:dist'], function() {
	gulp.src('./src/index.html')
		.pipe(gulp.dest('./dist'));
});

// FIXME excludes less and scss directories
gulp.task('build:copy:css', ['del:dist'], function() {
	gulp.src('./src/css/**/*.*')
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('build:copy:img', ['del:dist'], function() {
	gulp.src('./src/img/*.*')
		.pipe(gulp.dest('./dist/img'));
});

gulp.task('build:copy:fonts', ['del:dist'], function() {
	gulp.src('./src/fonts/*.*')
		.pipe(gulp.dest('./dist/fonts'));
});

// SIMPLE
gulp.task('copy:index', function() {
	gulp.src('./src/index.html')
		.pipe(gulp.dest('./dist'));
});


gulp.task('build:webpack', function() {
  return gulp.src('./src/js/main.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('build',
  ['del:dist',
   'build:webpack',
   'build:copy:index',
   'build:copy:css',
   'build:copy:img',
   'build:copy:fonts']);

gulp.task('default',
  ['webpack',
  'copy:index']);


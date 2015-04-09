var gulp = require('gulp');
var del = require('del');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var rename = require('gulp-rename');


// DEL
gulp.task('del:dist', function (callback) {
  del([
    './dist/index.html',
    './dist/css/**',
    './dist/js/**',
    './dist/img/**'
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

gulp.task('build:browserify', ['del:dist'], function() {
	var bundler = browserify('./src/js/main.js');
	bundler.transform(babelify);

	return bundler.bundle()
		.pipe(source('pogues.js'))
		.pipe(gulp.dest('./dist/js'));
});

// SIMPLE
gulp.task('copy:index', function() {
	gulp.src('./src/index.html')
		.pipe(gulp.dest('./dist'));
});

gulp.task('browserify', function() {
	var bundler = browserify('./src/js/main.js');
	bundler.transform(babelify);

	return bundler.bundle()
		.pipe(source('pogues.js'))
		.pipe(gulp.dest('./dist/js'));
});

gulp.task('build',
  ['del:dist',
   'build:browserify',
   'build:copy:index',
   'build:copy:css',
   'build:copy:img']);

gulp.task('default',
  ['browserify',
  'copy:index']);

gulp.task('watch', function() {
	gulp.watch('src/**/*.*', ['default']);
});

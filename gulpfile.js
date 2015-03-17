var gulp = require('gulp');
var del = require('del');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var babel = require('gulp-babel');
var rename = require('gulp-rename');

gulp.task('del:dist', function (callback) {
  del([
    './dist/index.html',
    './dist/css/**',
    './dist/js/**',
    './dist/img/**'
    ],
     callback);
});

gulp.task('copy:index', function() {
	gulp.src('./src/index.html')
		.pipe(gulp.dest('./dist'));
});

// Adding del:dist dependencies, assuring both tasks won't collide
gulp.task('copy:css', ['del:dist'], function() {
	gulp.src('./src/css/*.*')
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('browserify', function() {
	var bundler = browserify('./src/js/main.js');
	bundler.transform(reactify);

	return bundler.bundle()
		.pipe(source('pogues.js'))
		.pipe(gulp.dest('./dist/js'));
});

gulp.task('es6toes5', function () {
  gulp.src('./src/js/models/es6/*.js')
    .pipe(rename(function(path) {
      path.basename = path.basename.replace(/.es6/, '')
    }))
    .pipe(babel())
    .pipe(gulp.dest('./src/js/models'));
});

gulp.task('build', ['del:dist', 'browserify', 'copy:index', 'copy:css']);

gulp.task('default', ['browserify', 'copy:index']);

gulp.task('watch', function() {
	gulp.watch('src/**/*.*', ['default']);
});

var gulp = require('gulp');
var del = require('del');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');

gulp.task('del:dist', function (callback) {
  del([
    './dist/index.html',
    './dist/css/**',
    './dist/js/**'
    ],
     callback);
});

gulp.task('copy:index', function() {
	gulp.src('./src/index.html')
		.pipe(gulp.dest('./dist'));
});

gulp.task('copy:css', function() {
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

gulp.task('build', ['del:dist', 'browserify', 'copy:index', 'copy:css']);

gulp.task('default', ['browserify', 'copy:index']);

gulp.task('watch', function() {
	gulp.watch('src/**/*.*', ['default']);
});

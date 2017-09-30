const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const pump = require('pump');
const autoprefixer = require('gulp-autoprefixer');

// Main tasks

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('prod', ['sass', 'compress']);

gulp.task('dev', ['sass', 'compress', 'sass:watch']);

// All tasks

gulp.task('sass', function () {

  gulp.src('css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'))

});

gulp.task('sass:watch', function () {
  gulp.watch('css/**/*.scss', ['sass'])
});

gulp.task('compress', function (cb) {
  pump([
      gulp.src('js/*.js'),
      uglify(),
      gulp.dest('js')
    ],
    cb
  );
});

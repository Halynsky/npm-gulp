const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const pump = require('pump');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const runSequence = require('run-sequence');
const imagemin = require('gulp-imagemin');
const deletefile = require('gulp-delete-file');

// Main tasks

gulp.task('default', function() {
  // place code for your default task here
});
gulp.task('prod', ['compress-css', 'compress-js', 'compress-images']);
gulp.task('dev', ['compress-css', 'compress-js', 'compress-images', 'watch']);

// Task sequences

gulp.task('compress-css', function(callback) {
  runSequence('sass', 'autoprefixer-css', 'minify-css', function() {
    callback();
  });
});

// All tasks

gulp.task('sass', function (callback) {
  pump([
      gulp.src('src/css/**/*.scss'),
      sass().on('error', sass.logError),
      gulp.dest('src/css')
    ],
    callback
  );
});


gulp.task('autoprefixer-css', function (callback) {
  pump([
      gulp.src(['!src/css/**/*.min.css','src/css/**/*.css']),
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }),

      gulp.dest('src/css')
    ],
    callback
  );
});

gulp.task('minify-css', function (callback) {
  pump([
      gulp.src(['!src/css/**/*.min.css','src/css/**/*.css'], { base: "src" }),
      cleanCSS({compatibility: 'ie8'}),
      rename({ suffix: '.min' }),
      gulp.dest('dist')
    ],
    callback
  );
});

gulp.task('compress-js', function (callback) {

  var options = {
    mangle: {
      toplevel: true,
      eval: true
    },
    output: {
      beautify: false,
      comments: false
    }
  };

  pump([
      gulp.src(['!src/js/**/*.min.js' ,'src/js/**/*.js'], { base: "src" }),
      uglify(options),
      rename({ suffix: '.min' }),
      gulp.dest('dist')
    ],
    callback
  );

});

gulp.task('compress-images', function (callback) {
  pump([
      gulp.src(['src/images/**/*'], { base: "src" }),
      imagemin(),
      gulp.dest('dist')
    ],
    callback
  );
});

gulp.task('watch', function() {
  gulp.watch('src/css/**/*.scss', ['compress-css']);
  gulp.watch('src/js/**/*.js', ['compress-js'] );
  gulp.watch('src/images/*', ['compress-images']);
});

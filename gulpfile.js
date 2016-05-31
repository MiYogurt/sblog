var gulp = require('gulp');
var stylus = require('gulp-stylus');
var watch = require('gulp-watch');
 
gulp.task('css', function () {
  return gulp.src('./src/styles/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./www/static/css/'));
});
 
gulp.task('watch', function () {
  watch('./src/styles/*.styl', function () {
      gulp.src('./src/styles/*.styl')
          .pipe(stylus({
                compress: true
            }))
          .pipe(gulp.dest('./www/static/css/'));
  });
});

gulp.task('default', ['watch']);
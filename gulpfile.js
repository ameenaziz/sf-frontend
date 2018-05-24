var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var sass         = require('gulp-sass');
var autoprefixer = autoprefixer = require('gulp-autoprefixer');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

  browserSync.init({
    server: "./site",
    notify: false, // don't notify - it lingers too long and gets in the way of the design
    open: false // don't automatically open a browser - usually I might start or stop gulp, so I don't want to have to keep opening and closing tabs.
  });

  gulp.watch("site/scss/*.scss", ['sass']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("site/scss/*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: [
        'last 2 versions',
        'ie 9'
      ]
    }))
    .pipe(gulp.dest("site/css"))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
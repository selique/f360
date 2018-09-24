var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var pkg = require('./package.json');
var browserSync = require('browser-sync').create();

// Set the banner content
var banner = ['/*!\n',
  ' * <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2018-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Contact https://www.linkedin.com/in/selique/\n',
  ' */\n',
  '\n'
].join('');

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function() {

  // Bootstrap
  gulp.src([
      './node_modules/bootstrap/dist/**/*',
      '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
      '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
    .pipe(gulp.dest('./vendor/bootstrap'))

  // Font Awesome
  gulp.src([
      './node_modules/@fortawesome/**/*',
    ])
    .pipe(gulp.dest('./vendor'))

  // jQuery
  gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./vendor/jquery'))

  // Owl-Caroussel
  gulp.src([
      './node_modules/owl.carousel/dist/*.js'
    ])
    .pipe(gulp.dest('./vendor/owl-carousel/js'))
  gulp.src([
      './node_modules/owl.carousel/dist/assets/*.css'
    ])
    .pipe(gulp.dest('./vendor/owl-carousel/css'))
  // Fullpage.js
  gulp.src([
      './node_modules/fullpage.js/dist/*.js'
    ])
    .pipe(gulp.dest('./vendor/fullpagejs/js/'))
  gulp.src([
      './node_modules/fullpage.js/dist/*.css'
    ])
    .pipe(gulp.dest('./vendor/fullpagejs/css/'))
  // Animated.css
  gulp.src([
      './node_modules/animate.css/*.css'
    ])
    .pipe(gulp.dest('./vendor/animate/css/'))
  // Three.js
  gulp.src([
      './node_modules/three/build/*'
    ])
    .pipe(gulp.dest('./vendor/three/'))
  // DoT.js
  gulp.src([
      './node_modules/dot/doT.*'
    ])
    .pipe(gulp.dest('./vendor/dot/'))
  // uEvent.js
  gulp.src([
      './node_modules/uevent/uevent.*'
    ])
    .pipe(gulp.dest('./vendor/uevent/'))
  // D.js
  gulp.src([
      './node_modules/d.js/lib/*'
    ])
    .pipe(gulp.dest('./vendor/djs/'))

  // Photo Sphere Viewer
  gulp.src([
      './node_modules/photo-sphere-viewer/dist/*'
    ])
    .pipe(gulp.dest('./vendor/photo-sphere-viewer/'))
});

// Compile SCSS
gulp.task('css:compile', function() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest('./css'))
});

// Minify CSS
gulp.task('css:minify', ['css:compile'], function() {
  return gulp.src([
      './css/*.css',
      '!./css/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

// CSS
gulp.task('css', ['css:compile', 'css:minify']);

// Minify JavaScript
gulp.task('js:minify', function() {
  return gulp.src([
      './js/*.js',
      '!./js/*.min.js'
    ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest('./js'))
    .pipe(browserSync.stream());
});

// JS
gulp.task('js', ['js:minify']);

// Default task
gulp.task('default', ['css', 'js', 'vendor']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Dev task
gulp.task('dev', ['css', 'js', 'browserSync'], function() {
  gulp.watch('./scss/*.scss', ['css']);
  gulp.watch('./js/*.js', ['js']);
  gulp.watch('./*.html', browserSync.reload);
});

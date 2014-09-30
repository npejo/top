// Load plugins
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var cache = require('gulp-cache');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var del = require('del');
var ngAnnotate = require('gulp-ng-annotate');
var inject = require("gulp-inject");

var paths = {
  all: ['src/**/*.*'],
  scripts: ['src/scripts/**/*.js'],
  styles: ['src/styles/**/*.scss'],
  images: 'src/images/**/*',
  dist: {
    all: 'dist/',
    scripts: 'dist/scripts/',
    vendor: 'dist/components/',
    styles: 'dist/styles/',
    images: 'dist/images/'
  }
};

var vendor = {
  src: [
    'components/angular/angular.js'
  ],
  min: [
    'components/angular/angular.min.js'
  ]
};
// Styles
gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest(paths.dist.styles))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest(paths.dist.styles))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('vendorScripts', function () {
  return gulp.src(vendor.src)
    .pipe(gulp.dest(paths.dist.vendor))
    .pipe(notify({ message: 'Vendor scripts task complete' }));
});

// Scripts
gulp.task('scripts', function () {
  return gulp.src(paths.scripts)
    .pipe(jshint('../.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('top.js'))
    .pipe(ngAnnotate())
    .pipe(gulp.dest(paths.dist.scripts))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist.scripts))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function () {
  return gulp.src(paths.images)
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(paths.dist.images))
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function (cb) {
  del([paths.dist.all], cb)
});

gulp.task('index', ['copyAll', 'vendorScripts'], function () {

  var target = gulp.src('dist/index.html');

  var sources = gulp.src([paths.dist.scripts + '**/*.js', 'dist/**/*.css'], {read: false});
  var vendorSources = gulp.src([paths.dist.vendor + '*.js'], {read: false});

  return target.pipe(inject(sources, {relative: true}))
    .pipe(inject(vendorSources, {relative: true, name: 'vendor'}))
    .pipe(gulp.dest('dist'));
});

// Build task
gulp.task('build', ['clean'], function () {
  gulp.start('styles', 'scripts', 'images');
});

// Watch
gulp.task('watch', function () {

  // Watch .scss files
  gulp.watch(paths.styles, ['styles']);

  // Watch .js files
  gulp.watch(paths.scripts, ['scripts']);

  // Watch image files
  gulp.watch(paths.images, ['images']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch([paths.dist.all + '**']).on('change', livereload.changed);

});

// Webserver
gulp.task('webserver', function () {
  connect.server({
    livereload: true,
    root: 'dist'
  });
});

// Dev copy files
gulp.task('copyAll', function () {
  return gulp.src('src/**/*.*')
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
});

// Dev build task
gulp.task('devBuild', ['clean'], function () {
  gulp.start('copyAll', 'vendorScripts', 'index');
});

// Dev watch
gulp.task('devWatch', function () {
  gulp.watch([paths.all], ['devBuild']);
});

// Default task
gulp.task('serve', ['devBuild', 'devWatch'], function () {
  gulp.start('webserver');
});
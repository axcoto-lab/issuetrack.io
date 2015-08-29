var gulp = require('gulp');
var less = require('gulp-less');
var browserify = require('gulp-browserify');
var webserver = require('gulp-webserver');
var minifyCSS = require('gulp-minify-css');
var image = require('gulp-image');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var path = require('path');
 
var paths = {
  less: 'src/less/main.less',
  js: { 
    app: 'src/js/app.js',
    all: [ 'src/js/**/*.js', 'gulpfile.js' ]
  },
  images: 'src/images/**/*'
};

gulp.task('server', function() {
  'use strict';
  gulp.src('.')
    .pipe(webserver({
      livereload: false
    }));
});

gulp.task('lint', function() {
  'use strict';
  gulp.src(paths.js.all)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('scripts', [ 'lint' ], function() {
  'use strict';
  gulp.src(paths.js.app)
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('images', function () {
  'use strict';
  gulp.src(paths.images)
    .pipe(image())
    .pipe(gulp.dest('./build/images'));
});

gulp.task('less', function() {
  'use strict';
  gulp.src(paths.less)
    .pipe(less({
      paths: [
        path.join(__dirname, 'node_modules'),
        path.join(__dirname, 'vendor')
      ]
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('build', [
  'less',
  'scripts',
  'images'
]);

gulp.task('watch', [ 'build', 'server' ], function() {
  'use strict';
  gulp.watch(paths.less, [ 'less' ]);
  gulp.watch(paths.js.all, [ 'scripts' ]);
  gulp.watch(paths.images, [ 'images' ]);
});

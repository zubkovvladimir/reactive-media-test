const { src, dest, watch, parallel } = require('gulp');

const less = require('gulp-less');
const rename = require('gulp-rename');
const server = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');

function styles() {
  return src('source/less/style.less')
          .pipe(less({compress: true}))
          .pipe(autoprefixer())
          .pipe(rename('style.min.css'))
          .pipe(dest('build/css'))
          .pipe(server.stream())
}

function watching() {
  watch(['source/less/**/*.less'], styles);
  watch(['source/js/**/*.js'], scripts);
  watch(['source/*.html']).on('change', server.reload);
}

function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'source/js/main.js'
  ])
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(dest('build/js'))
  .pipe(server.stream())
}

function browserSync() {
  server.init({
    server: {
      baseDir: 'build/'
    }
  })
}

exports.build = parallel(styles, scripts);
exports.start = parallel(styles, scripts, browserSync, watching);

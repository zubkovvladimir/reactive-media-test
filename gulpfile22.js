const { src, dest } = require('gulp');

const less = require('gulp-less');


function styles() {
  return src('source/less/style.less')
          .pipe(less())
          .pipe(dest('build/css'))
}

exports.styles = styles;

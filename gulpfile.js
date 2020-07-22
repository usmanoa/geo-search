const { dest, src } = require('gulp');
const eslint = require('gulp-eslint');

function processHTML(cb) {
    src('index.html')
        .pipe(dest('build'));
    cb();
}

function processJS(cb) {
    src('js/*.js')
        .pipe(dest('build'));
    cb();
}

function lint() {
    return src('js/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
}

exports.processHTML = processHTML;
exports.processJS = processJS;
exports.lint = lint;

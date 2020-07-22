const { dest, parallel, src } = require('gulp');
const htmlmin = require('gulp-htmlmin');
const csso = require('gulp-csso');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify-es').default;

function processHTML() {
    return src('*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
        }))
        .pipe(dest('build'));
}

function processCSS() {
    return src('css/*.css')
        .pipe(csso())
        .pipe(dest('build/css'));
}

function processAssets() {
    return src('assets/*.*')
        .pipe(dest('build/assets'));
}

function processJS() {
    return src('js/*.js')
        .pipe(uglify())
        .pipe(dest('build/js'));
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
exports.build = parallel(processHTML, processCSS, processAssets, processJS);

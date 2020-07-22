const {
    dest, parallel, series, src, watch,
} = require('gulp');
const htmlmin = require('gulp-htmlmin');
const csso = require('gulp-csso');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify-es').default;
const del = require('del');
const browserSync = require('browser-sync').create();

const processHTML = () => src('src/*.html')
    .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true,
    }))
    .pipe(dest('build'));

const processCSS = () => src('src/css/*.css')
    .pipe(csso())
    .pipe(dest('build/css'));

const processAssets = () => src('src/assets/*.*')
    .pipe(dest('build/assets'));

const processJS = () => src('src/js/*.js')
    .pipe(uglify())
    .pipe(dest('build/js'));

const lint = () => src('src/js/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());

const clean = () => del(['build']);

const browserReload = (cb) => {
    browserSync.init({
        server: './src',
        port: 8080,
        ui: {
            port: 8081,
        },
    });
    cb();
};

const watchFiles = () => {
    watch('**/*.html').on('change', browserSync.reload);
    watch('**/*.css').on('change', browserSync.reload);
    watch('**/*.js').on('change', browserSync.reload);
};

exports.lint = lint;
exports.build = series(
    clean,
    parallel(processHTML, processCSS, processAssets),
    series(lint, processJS),
);

exports.default = series(browserReload, watchFiles);

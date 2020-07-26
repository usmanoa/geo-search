const {
    dest, parallel, series, src, watch,
} = require('gulp');
const htmlmin = require('gulp-htmlmin');
const csso = require('gulp-csso');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify-es').default;
const del = require('del');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const envify = require('envify/custom');
require('dotenv').config();

const processHTML = () => src('src/*.html')
    .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true,
    }))
    .pipe(dest('dist'));

const processCSS = () => src('src/css/*.css')
    .pipe(csso())
    .pipe(dest('dist/css'));

const processAssets = () => src('src/assets/*.*')
    .pipe(dest('dist/assets'));

const bundleJS = (cb) => {
    browserify({
        entries: 'src/js/main.js',
        debug: true,
    })
        .transform(envify({
            MAPQUEST_API_KEY: process.env.MAPQUEST_API_KEY,
            OPENWEATHERMAP_API_KEY: process.env.OPENWEATHERMAP_API_KEY,
        }))
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(dest('dist/js'));

    cb();
}

const lint = () => src('src/js/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());

const clean = () => del(['dist']);

const browserReload = (cb) => {
    browserSync.init({
        server: './dist',
        port: 8080,
        ui: {
            port: 8081,
        },
    });
    cb();
};

const watchFiles = () => {
    watch('src/*.html').on('change', processHTML);
    watch('src/css/*.css').on('change', processCSS);
    watch('src/js/*.js').on('change', bundleJS);

    watch('dist/**/*.*').on('change', browserSync.reload);
};

const startProcess = series(
    parallel(processHTML, processCSS, processAssets, bundleJS),
    browserReload,
    watchFiles,
);

const buildProcess = series(
    clean,
    parallel(processHTML, processCSS, processAssets),
    bundleJS,
);

exports.lint = lint;
exports.start = startProcess;
exports.default = startProcess;
exports.build = buildProcess;

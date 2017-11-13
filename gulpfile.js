'use strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify'); // minify JS
const concat = require('gulp-concat'); // concat JS
const sass = require('gulp-sass'); // concat and minify SCSS
const rename = require('gulp-rename'); // rename files
const plumber = require('gulp-plumber'); // error handling
const sourcemaps = require('gulp-sourcemaps'); // source maps
const imagemin = require('gulp-imagemin'); // minify png, jpeg, gif and svg
const imageminPngquant = require('imagemin-pngquant'); // imagemin plugin for png
const imageminJpegRecompress = require('imagemin-jpeg-recompress'); // imagemin plugin for jpeg
const del = require('del'); // delete files
const livereload = require('gulp-livereload'); // reloading website when changes are made

/* -+-+-+----------------------------------+-+-+-
* FILE PATHS
-+-+-+----------------------------------+-+-+- */

const DIST_PATH = 'dist';
const SCRIPTS_DIST_PATH = `${DIST_PATH}/scripts`;
const SASS_DIST_PATH = `${DIST_PATH}/styles`;
const IMAGES_DIST_PATH = `${DIST_PATH}/content`;
const SCRIPTS_PATH = 'js/**/*.js';
const SASS_PATH = 'sass/**/*.scss';
const IMAGES_PATH = 'images/**/*.{png,jpeg,jpg,svg,gif}';
const ALL_DIST_PATHS = [SCRIPTS_DIST_PATH, SASS_DIST_PATH, IMAGES_DIST_PATH];

/* -+-+-+----------------------------------+-+-+-
* GULP TASKS
-+-+-+----------------------------------+-+-+- */

// Styles
gulp.task('styles', () => {
    console.log('starting styles task');

    return gulp.src(SASS_PATH)
        .pipe(plumber(err => {
            console.log('Styles Task Error: ', err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(rename('all.min.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(SASS_DIST_PATH))
        .pipe(livereload());
});

// Scripts
gulp.task('scripts', () => {
    console.log('starting scripts task');

    return gulp.src(SCRIPTS_PATH)
        .pipe(plumber(err => {
            console.log('Scripts Task Error: ', err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(SCRIPTS_DIST_PATH))
        .pipe(livereload());
});

// Images
gulp.task('images', () => {
    console.log('starting images task');

    return gulp.src(IMAGES_PATH)
        .pipe(imagemin([
            imagemin.gifsicle(), // compress gifs -- lossless
            imagemin.jpegtran(), // compress jpegs -- lossless
            imagemin.optipng(), // compress pngs -- lossless
            imagemin.svgo(), // compress svgs -- lossless
            imageminPngquant(), // lossy png compression
            imageminJpegRecompress() // lossy jpeg compress
        ]))
        .pipe(gulp.dest(IMAGES_DIST_PATH));
});

// Delete Files
gulp.task('clean', () => {
    console.log('starting clean task');

    return del.sync(ALL_DIST_PATHS);
});

// Build Task
gulp.task('build', ['clean', 'images', 'styles', 'scripts'], () => {
    console.log('starting default task');
});

// Default
gulp.task('default', ['build'], () => {
    console.log('starting default task');

    require('./server');
    livereload.listen({ start: true });
    gulp.watch(SASS_PATH, ['styles']);
    gulp.watch(SCRIPTS_PATH, ['scripts']);
});




























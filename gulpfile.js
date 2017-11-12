'use strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify'); // minify JS
const concat = require('gulp-concat'); // concat JS
const sass = require('gulp-sass'); // concat and minify SCSS
const rename = require('gulp-rename'); // rename files
const plumber = require('gulp-plumber'); // error handling
const sourcemaps = require('gulp-sourcemaps'); // sourcmaps

/* -+-+-+----------------------------------+-+-+-
* FILE PATHS
-+-+-+----------------------------------+-+-+- */

const DIST_PATH = 'dist';
const SCRIPTS_DIST_PATH = `${DIST_PATH}/scripts`;
const SASS_DIST_PATH = `${DIST_PATH}/styles`;
const SCRIPTS_PATH = 'js/**/*.js';
const SASS_PATH = 'sass/**/*.scss';

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
        .pipe(gulp.dest(SASS_DIST_PATH));
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
        .pipe(gulp.dest(SCRIPTS_DIST_PATH));
});

// Images
gulp.task('images', () => {
    console.log('starting images task');
});

// Default
gulp.task('default', () => {
    console.log('starting default task');
});
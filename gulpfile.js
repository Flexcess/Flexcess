// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var cssbeautify = require('gulp-cssbeautify');
var removeEmptyLines = require('gulp-remove-empty-lines');

gulp.task('sass', function() {
    gulp.src('./sass/main.scss')
        .pipe(sass({
            includePaths: require('node-bourbon').includePaths
        }))
        .pipe(cssbeautify())
        .pipe(removeEmptyLines())
        .pipe(rename('flexcess.css'))
        .pipe(gulp.dest( './css' ))
        .pipe(sass({ includePaths: require('node-bourbon').includePaths, outputStyle: 'compressed' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', function() {
    gulp.watch('*.scss', ['sass']);
})
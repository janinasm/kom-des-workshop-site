var gulp = require('gulp'),
    watch = require('gulp-watch'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssvars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    cssImport = require('postcss-import'),
    browserSync = require('browser-sync').create();

gulp.task('styles', function() {
    return gulp.src('./assets/styles/style.css')
        .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
        .pipe(gulp.dest('./temp/styles'));

});

gulp.task('watch', function() {

    browserSync.init({
        notify: false,
        server: {
            baseDir: "."
        }
    })

    watch('./index.html', function() {
        browserSync.reload();
    });

    watch('./assets/styles/**/*.css', function() {
        gulp.start('cssInject');
    });
});

gulp.task('cssInject', ['styles'], function() {
    return gulp.src('./temp/styles/style.css')
        .pipe(browserSync.stream());
})
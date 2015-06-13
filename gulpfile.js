var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');

gulp.task('default', function() {
    gulp.src('src/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
})

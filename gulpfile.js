var gulp = require('gulp');
var ts = require('gulp-typescript');
var del = require("del");
var tslint = require("gulp-tslint");
var runSequence = require('gulp-Sequence');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', function (cb) {
  return del(['lib'], cb);
});

gulp.task('tsc', function () {
  return gulp.src('./src/**/**.ts')
    .pipe(tsProject())
    .js
    .pipe(gulp.dest('./lib'));
});

gulp.task('lint', function () {
  gulp.src('./src/**/**.ts').
    pipe(tslint({
      configuration: './tslint.json'
    }))
    .pipe(tslint.report({
      emitError: false, // if err, not stop gulp
    }))
});

gulp.task('build', function (cb) {
  runSequence('lint','clean', 'tsc')(cb);
});

gulp.task('watch', function () {
  gulp.watch(["src/**/*.ts"], ['build']).on('change', function (e) {
      console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
  });
});

gulp.task('default', ['build']);

var gulp = require("gulp");
var ts = require("gulp-typescript");
var del = require("del");
var runSequence = require("gulp-Sequence");
var tsProject = ts.createProject("tsconfig.json");

gulp.task("clean", function(cb) {
  return del(["lib"], cb);
});

gulp.task("tsc", function() {
  return gulp
    .src("./src/**/**.ts")
    .pipe(tsProject())
    .js.pipe(gulp.dest("./lib"));
});

gulp.task("build", function(cb) {
  runSequence("clean", "tsc")(cb);
});

gulp.task("watch", function() {
  gulp.watch(["src/**/*.ts"], ["build"]).on("change", function(e) {
    console.log("TypeScript file " + e.path + " has been changed. Compiling.");
  });
});

gulp.task("default", ["build"]);

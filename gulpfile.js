// dependencies
const gulp = require("gulp");
const sass = require("gulp-sass");
const minifyCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const changed = require("gulp-changed");

// scss/css

const SCSS_SRC = "./client/src/styles/**/*.scss";
const SCSS_DEST = "./client/src/styles/css";

// compile scss
gulp.task("compile_scss", () => {
  gulp
    .src(SCSS_SRC)
    .pipe(sass().on("error", sass.logError))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(changed(SCSS_DEST))
    .pipe(gulp.dest(SCSS_DEST));
});

// detect changes in scss
gulp.task("watch_scss", () => {
  gulp.watch(SCSS_SRC, ["compile_scss"]);
});

// run tasks
gulp.task("default", ["watch_scss"]);

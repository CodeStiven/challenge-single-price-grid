const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const terser = require("gulp-terser");
const browsersync = require("browser-sync").create();

// Sass taks
function scssTask() {
  return src("src/scss/style.scss", { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([cssnano()]))
    .pipe(dest("public", { sourcemaps: "." }));
}

// Javascript Task

 function jsTask() {
   return src("src/js/main.js", { sourcemaps: "." })
     .pipe(terser())
     .pipe(dest("public", { sourcemaps: "." }));
 }

// BrowsersyncTask

function browsersyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: "."
    }
  });
  cb();
}

function browsersyncReload(cb) {
  browsersync.reload();
  cb();
}

// Watch Task

function watchTask() {
  watch("*.html", browsersyncReload);
  watch(["src/scss/**/*.scss", "src/js/**/*.js"], series(scssTask,jsTask,browsersyncReload));
}

// Default gulp task

exports.default = series(scssTask, jsTask, browsersyncServe, watchTask);
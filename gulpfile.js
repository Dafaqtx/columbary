const gulp = require("gulp");
const sass = require("gulp-sass");
const del = require("del");
const imagemin = require("gulp-imagemin");
const pngquant = require("imagemin-pngquant");
const cache = require("gulp-cache");
const browserSync = require("browser-sync");
const concat = require("gulp-concat");
const cleancss = require("gulp-clean-css");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const notify = require("gulp-notify");
const ghPages = require("gulp-gh-pages");

gulp.task("browser-sync", function() {
  browserSync({
    server: {
      baseDir: "app"
    },
    notify: false
    // open: false,
    // online: false, // Work Offline Without Internet Connection
    // tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
  });
});

gulp.task("styles", function() {
  return gulp
    .src("app/sass/**/*.sass")
    .pipe(
      sass({
        includePaths: require("node-normalize-scss").includePaths,
        outputStyle: "expanded"
      }).on("error", notify.onError())
    )
    .pipe(rename({ suffix: ".min", prefix: "" }))
    .pipe(autoprefixer(["last 15 versions"]))
    .pipe(cleancss({ level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
});

gulp.task("js", function() {
  return (
    gulp
      .src([
        "app/libs/jquery/dist/jquery.min.js",
        "app/js/common.js" // Always at the end
      ])
      .pipe(concat("scripts.min.js"))
      // .pipe(uglify()) // Mifify js (opt.)
      .pipe(gulp.dest("app/js"))
      .pipe(browserSync.reload({ stream: true }))
  );
});

gulp.task("watch", ["styles", "js", "browser-sync"], function() {
  gulp.watch("app/sass/**/*.sass", ["styles"]);
  gulp.watch(["libs/**/*.js", "app/js/common.js"], ["js"]);
  gulp.watch("app/*.html", browserSync.reload);
});

gulp.task("clean", function() {
  return del.sync("dist");
});

gulp.task("img", function() {
  return gulp
    .src("app/img/**/*")
    .pipe(
      cache(
        imagemin({
          // .pipe(imagemin({
          interlaced: true,
          progressive: true,
          svgoPlugins: [{ removeViewBox: false }],
          use: [pngquant()]
        })
      ) /**/
    )
    .pipe(gulp.dest("dist/img"));
});

gulp.task("build", ["clean", "img", "styles", "js"], function() {
  var buildCss = gulp.src(["app/css/main.min.css"]).pipe(gulp.dest("dist/css"));

  var buildFonts = gulp.src("app/fonts/**/*").pipe(gulp.dest("dist/fonts"));

  var buildJs = gulp.src("app/js/**/*").pipe(gulp.dest("dist/js"));

  var buildHtml = gulp.src("app/*.html").pipe(gulp.dest("dist"));
});

gulp.task("clear", function(callback) {
  return cache.clearAll();
});

gulp.task("deploy", function() {
  return gulp.src("./dist/**/*").pipe(ghPages());
});

gulp.task("default", ["watch"]);

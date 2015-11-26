var gulp = require("gulp");
var concat = require("gulp-concat");
var del = require("del");
var addsrc = require("gulp-add-src");
var uglify = require("gulp-uglify");
var browserify = require('gulp-browserify');

gulp.task("clean", function(){
  del("dist");
});

gulp.task("js", function(){
  gulp.src("models/link.js")
  .pipe(addsrc("models/tag.js"))
  .pipe(addsrc("routes/index.js"))
  .pipe(addsrc("routes/links.js"))
  .pipe(addsrc("routes/tags.js"))
  .pipe(addsrc("module.js"))
  .pipe(concat("bundle.js"))
  .pipe(browserify())
  .pipe(uglify())
  .pipe(gulp.dest("./dist"));
});

gulp.task("build", ["clean", "js"]);

gulp.task("watch", function(){
  gulp.watch("*", ["build"]);
});

// gulp.task('scripts', function() {
//   gulp.src('*.js')
//   .pipe(browserify({
//     insertGlobals : true,
//     debug : !gulp.env.production
//   }))
//   .pipe(gulp.dest('./dist'));
// });

gulp.task("default", ["build"]);
const gulp = require("gulp");
// sass
const sass = require("gulp-dart-sass");
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const mqpacker = require("css-mqpacker");

// webpack
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");

function styles (mode){

    const outputStyle = (mode === "production") ? "compressed": "expanded";
    
    return gulp
        .src(["./sass/**/*.scss"])
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sass({
            outputStyle: outputStyle
        }))
        .pipe(postcss([
            autoprefixer(),
            mqpacker()
        ]))
        .pipe(gulp.dest("../"));
}

function scripts(mode){
      return plumber({
          errorHandler: notify.onError("<%= error.message %>"),
        }).pipe(webpackStream(webpackConfig(mode), webpack))
        .pipe(gulp.dest("../"))
}


gulp.task("default",gulp.parallel(
    () => {
      gulp.watch(["./sass/**/*.scss"],()=>{
        return styles();
      })
    },
    () => {
      gulp.watch(["./es6/**/*.js"], ()=>{
        return scripts();
      })
    },
  )
);

gulp.task("production",gulp.parallel(
    () => {
        return styles("production");
    },
    () => {
        return scripts("production");
    },
  )
);
var autoprefixer = require("gulp-autoprefixer"),
    buffer = require("vinyl-buffer"),
    connect = require("gulp-connect"),
    ghPages = require("gulp-gh-pages"),
    gulp = require("gulp"),
    indexify = require("gulp-indexify"),
    notify = require("gulp-notify"),
    path = require("path"),
    plumber = require("gulp-plumber"),
    sass = require("gulp-sass"),
    sourcemaps = require("gulp-sourcemaps"),
    Squick = require("squick"),
    typescript = require("gulp-typescript")
    ;


var paths = {
    out: "output/",
    out_src: "output/**/*",
    extras: ["extras/**/*", "content/**/*.png"],
    styles: ["views/styles/styles.scss"],

    content: ["content/**/*.md"],
    views: "views/**/*.html",

    scripts: "lib/**/*.ts",
    out_scripts: "output/lib"
};

gulp.task("extras", function() {
  return gulp.src(paths.extras)
        .pipe(connect.reload())
        .pipe(gulp.dest(paths.out));
});

var project = typescript.createProject({
    sourceMaps: true,
    sortOutput: true,
    noExternalResolve: false,
    target: 'ES5',
    module: 'commonjs',
    noEmitOnError: true,
    removeComments: false,
    declaration: true
});

gulp.task("scripts", function() {
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(typescript(project))
        .js.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.out_scripts))
        .pipe(connect.reload());
});

gulp.task("styles", function () {
  return gulp.src(paths.styles)
    .pipe(plumber({ errorHandler: function(err) {
      notify.onError()(err);
      this.emit("end");
    }}))
    .pipe(sass({
       includePaths: "views/styles/"
    }))
    .pipe(autoprefixer({
      browsers: ["last 2 versions"],
      cascade: true
    }))
    .pipe(connect.reload())
    .pipe(gulp.dest(paths.out));
});


gulp.task("squick", function() {
    return gulp.src(paths.content)
      .pipe(plumber({ errorHandler: function(err) {
          notify.onError()(err);
          this.emit("end");
        }}))
      .pipe(new Squick({
        views: gulp.src(paths.views),
        filters: require("./squick_extensions").filters,
        helpers: require("./squick_extensions").helpers,
        site: {
            sidebar: [
                "category/projects.md",
                "category/toys.md",
                "category/examples.md"
            ]
        }
      }))
      .pipe(buffer())
      .pipe(indexify({
          rewriteRelativeUrls: true
      }))
      .pipe(gulp.dest(paths.out))
      .pipe(connect.reload())
      .pipe(notify({
        emitError: true,
        onLast: true,
        message: "squick completed"
      }))
    ;
});

gulp.task('deploy', ["squick", "styles", "extras"], function() {
    return gulp.src(paths.out_src)
        .pipe(ghPages());
});

gulp.task("connect", function() {
    connect.server({
        root: paths.out,
        livereload: true
    });
});

gulp.task("watch", function() {
    gulp.watch(paths.styles, ["styles"]);
    gulp.watch(paths.content, ["squick"]).on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running squick');
    });
    gulp.watch(paths.views, ["squick"]);
    gulp.watch(paths.extras, ["extras"]);
    gulp.watch(paths.scripts, ["scripts"]);
});

gulp.task("default", ["watch", "connect", "extras", "squick", "styles"]);

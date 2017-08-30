const bower = require("gulp-bower");
const gulp = require("gulp");
const install = require("gulp-install");
const nodemon = require("gulp-nodemon");
const livereload = require("gulp-livereload");

paths = {
    bower: "webapp/vendor",
    bowerjson: "./bower.json",
    packagejson: "./package.json",
    static: "webapp",
    scripts: "webapp/**/*.js",
    server: "app/**/*.js",
    app: "server",

};

gulp.task("bower", function () {
    return gulp.src([paths.bowerjson]).pipe(install());
});

gulp.task("npm", function () {
    return gulp.src([paths.packagejson]).pipe(install());
});

gulp.task("server", function () {
    livereload.listen();
    return nodemon({
        script: "./app.js",
        nodeArgs: ["--harmony"],
        watch:[".","./app","./views","./webapp"],
        ext:'js html css',

    }).on('start', function () {
        console.log("start--prepare livereload");
        setTimeout(function () {
            livereload.reload();
        },1000);

    });
});

gulp.task("watch", function () {
    gulp.watch(paths.bowerjson, ["bower"]);
    return gulp.watch(paths.packagejson, ["npm"]);
});




gulp.task("compile", ["bower"]);
gulp.task("default", ["watch", "server"]);
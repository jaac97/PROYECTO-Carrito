const {series, src, dest, watch} = require('gulp');
var sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const notify = require("gulp-notify");
const concat = require('gulp-concat');

function css(){
    return src('./src/css/app.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(dest('./build/css'));
}
function javascript(){
    return src("./src/js/**/*.js")
    .pipe(concat('bundle.js'))
    .pipe(dest('./build/js'))
}

function imagen(){
    return src('./src/img/**/*')
        .pipe(imagemin())
        .pipe(dest("./build/img"))
        .pipe(notify({
            message:'Minificado terminado',
            sound: false,
            onLast: true
        }));
}
function watchArchivos () {
    watch ('./src/css/**/*.scss', css);
}
exports.default = series(css,javascript,imagen, watchArchivos);
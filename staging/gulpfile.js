const {src, dest, series} = require('gulp');
const download = require("gulp-download-stream");
const unzip = require('gulp-unzip');
const streamify = require('gulp-streamify');

const srcDir = '${webjar.staging}/jquery-ui-${version.unrevise}/';
const destDir = '${webjar.target}/';

function task1() {
    return download(`https://jqueryui.com/resources/download/jquery-ui-${version.unrevise}.zip`)
        .pipe(streamify(unzip()))
        .pipe(dest('./'));
}

function task2() {
    return _copy('LICENSE.txt');
}

function task3() {
    return _copy('jquery-ui*', 'dist');
}

function task4() {
    return _copy('images/**', 'dist/images');
}

function _toSrc(_src) {
    return src(_src, {allowEmpty: false, cwd: srcDir});
}

function _toDest(_dest) {
    return dest(_dest || '.', {cwd: destDir});
}

function _copy(_src, _dest) {
    console.log('  Copying ' + _src);
    return _toSrc(_src).pipe(_toDest(_dest))
}

exports.default = series(task1, task2, task3, task4);

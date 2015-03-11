var gulp = require('gulp');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var mainBowerFiles = require('main-bower-files');

var paths = {
  js: 'js/*.js',
  css: 'css/*.css',
  images: 'img/*'
};

gulp.task('build', ['process']);

gulp.task('process', function() {
    return processLibraries();
});

function filterByExtension(extension) {
    return filter(function(file) {
        return file.path.match(new RegExp('.' + extension + '$'));
    });
};

function processLibraries() {
  console.log('Processing :: Vendor JS Libraries');
  var mainFiles = mainBowerFiles({
    checkExistence: true
  });
  var jsFilter = filterByExtension('js');

  if (!mainFiles.length) {
    // No files found
    return;
  }

  return gulp.src(mainFiles)
    .pipe(jsFilter)
    // .pipe(uglify())
    // .pipe(notify('<%= file.relative %>'))
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('build/js'));
};
const gulp = require('gulp');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');

const rollup = require('rollup-stream');
const runSequence = require('run-sequence');
const source = require('vinyl-source-stream');

const config = {
  scripts: {
    entry: 'src/scripts/main.js',
    source: 'src/scripts/**/*.js',
    destination: 'docs/assets/scripts',
  },
  views: {
    entry: 'src/views/index.hbs',
    source: 'src/views/**/*.hbs',
    destination: 'docs',
  },
};

gulp.task('scripts', () => {
  const options = {
    entry: config.scripts.entry,
    format: 'iife',
  };

  return rollup(options)
    .pipe(source('main.js'))
    .pipe(gulp.dest(config.scripts.destination));
});

gulp.task('views', () => {
  const data = {
    foo: 'bar',
  };

  const options = {
    partials: {
      foo: 'hoi!',
    },
  };

  return gulp.src(config.views.entry)
    .pipe(handlebars(data, options))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(config.views.destination));
});

gulp.task('default', done => runSequence('scripts', 'views', done));

gulp.task('watch', ['default'], () => {
  gulp.watch(config.scripts.source, gulp.series('scripts'));
  gulp.watch(config.views.source, gulp.series('views'));
});

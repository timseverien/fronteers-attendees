const gulp = require('gulp');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');

const rollup = require('rollup-stream');
const runSequence = require('run-sequence');
const source = require('vinyl-source-stream');

const config = {
  scripts: {
    source: 'src/scripts/**/*.js',
    destination: 'docs/assets/scripts',
  },
  styles: {
    source: 'src/styles/**/*.css',
    destination: 'docs/assets/styles',
  },
  views: {
    entry: 'src/views/index.hbs',
    source: 'src/views/**/*.hbs',
    destination: 'docs',
  },
};

gulp.task('scripts', () => {
  return rollup('rollup.config.js')
    .pipe(source('main.js'))
    .pipe(gulp.dest(config.scripts.destination));
});

gulp.task('styles', () => {
  return gulp.src(config.styles.source)
    .pipe(gulp.dest(config.styles.destination));
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

gulp.task('default', done => runSequence(['scripts', 'styles', 'views'], done));

gulp.task('watch', ['default'], () => {
  gulp.watch(config.scripts.source, ['scripts']);
  gulp.watch(config.styles.source, ['styles']);
  gulp.watch(config.views.source, ['views']);
});

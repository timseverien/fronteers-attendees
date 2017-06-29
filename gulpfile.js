const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);

const gulp = require('gulp');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

const buffer = require('vinyl-buffer');
const globby = require('globby');
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
    partials: 'src/views/partials/**/*.hbs',
    partialsPath: 'src/views/partials',
    source: 'src/views/**/*.hbs',
    destination: 'docs',
  },
};

let viewPartials = {};

gulp.task('scripts', () => {
  return rollup('rollup.config.js')
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.scripts.destination));
});

gulp.task('styles', () => {
  return gulp.src(config.styles.source)
    .pipe(gulp.dest(config.styles.destination));
});

gulp.task('views:update-partials', (done) => {
  viewPartials = {};

  const readView = (file) => {
    const partialPath = path.relative(config.views.partialsPath, file);
    const partialName = partialPath.substr(0, partialPath.length - 4);

    return readFileAsync(file)
      .then((data) => {
        viewPartials[partialName] = data.toString();
      });
  };

  globby(config.views.partials)
    .then(files => Promise.all(files.map(readView)))
    .then(() => done())
    .catch(e => done(e));
});

gulp.task('views:compile', () => {
  const data = {};

  const options = {
    partials: viewPartials,
  };

  return gulp.src(config.views.entry)
    .pipe(handlebars(data, options))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(config.views.destination));
});

gulp.task('views', done => runSequence('views:update-partials', 'views:compile', done));

gulp.task('default', done => runSequence(['scripts', 'styles', 'views'], done));

gulp.task('watch', ['default'], () => {
  gulp.watch(config.scripts.source, ['scripts']);
  gulp.watch(config.styles.source, ['styles']);
  gulp.watch(config.views.source, ['views']);
});

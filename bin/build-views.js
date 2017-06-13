const fs = require('fs');
const path = require('path');
const glob = require('globby');
const Handlebars = require('handlebars');

const PATH_TEMPLATE = process.argv[2];

const readPartial = (partial) => new Promise((resolve, reject) => {
  const filename = path.basename(partial, '.hbs');

  fs.readFile(partial, (err, data) => {
    if (err) return reject(err);

    Handlebars.registerPartial(filename, data.toString());
    resolve();
  });
});

const parseTemplate = () => {
  fs.readFile(PATH_TEMPLATE, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const template = Handlebars.compile(data.toString());

    const html = template({ foo: 'bar' });

    console.log(html);
  })
};

glob([
  'src/views/**/*.hbs',
  '!src/views/**/index.hbs',
])
  .then(partials => Promise.all(partials.map(readPartial)))
  .then(parseTemplate);

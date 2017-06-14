const request = require('request');

const EDITION_START = 2008;
const EDITION_END = (new Date()).getFullYear();

const getEditions = (start, end) => {
  const editions = [];

  for (let year = EDITION_START; year <= EDITION_END; year++) {
    editions.push(year);
  }

  return editions;
};

const getAttendees = (year) => new Promise((resolve, reject) => {
  const requestOptions = {
    url: `https://fronteers.nl/congres/${year}/attendees.json`,
    json: true,
  };

  request(requestOptions, (err, response, body) => {
    if (err) return reject(err);

    const data = body[`fronteers${year}`];
    data.year = year;

    resolve(data);
  });
});

const normalize = (edition) => ({
  year: edition.year,
  amount: edition.numberOfAttendeesThisyear,
  attendees: edition.andAllTheirOtherData.map((attendee) => ({
    name: attendee.name,
    company: attendee.company,
    twitter: attendee.twitter,
    isMember: !!attendee.awesome,
  })),
});

Promise.all(getEditions().map(getAttendees))
  .then(data => data.map(normalize))
  .then(data => JSON.stringify(data))
  .then(console.log)
  .catch(console.error);

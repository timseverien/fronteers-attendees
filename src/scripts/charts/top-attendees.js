import * as d3 from 'd3';

const countSimilarObjects = () => {
  let getKey = d => d;

  return {
    key(f) {
      getKey = f;
      return this;
    },

    data(data) {
      return data.reduce((obj, attendee) => {
        const key = getKey(attendee);

        if (!(key in obj)) {
          obj[key] = 0;
        }

        obj[key]++;

        return obj;
      }, {});
    },
  };
};

const compareEntriesByValueAndKey = (a, b) => {
  const diff = b.value - a.value;

  if (diff === 0) {
    return a.key.localeCompare(b.key);
  }

  return diff;
};

export default (container, data) => {
  const list = d3.select(container)

  const attendees = data.reduce((total, edition) => total.concat(edition.attendees), []);

  const attendeesTop = countSimilarObjects()
    .key(d => d.name)
    .data(attendees);

  const attendeesTopEntries = d3.entries(attendeesTop)
    .sort(compareEntriesByValueAndKey)
    .slice(0, 20);

  list.selectAll('li')
    .data(attendeesTopEntries)
    .enter().append('li')
    .text((d) => `${d.key} (${d.value})`);
};

import * as d3 from 'd3';
import arrayUnique from '../utils/array-unique';
import compareEntriesByValueAndKey from '../utils/compare-entries-by-value-and-key';
import countSimilarObjects from '../utils/count-similar-objects';
import getAttendees from '../utils/get-attendees';

export default (container, data) => {
  const list = d3.select(container);
  const attendees = getAttendees(data);

  const attendeesTop = countSimilarObjects()
    .key(d => d.name)
    .data(attendees);

  const attendeesTopEntries = d3.entries(attendeesTop)
    .sort(compareEntriesByValueAndKey);

  const valueMapping = attendeesTopEntries
    .map(d => d.value)
    .reduce(arrayUnique, []);

  list.selectAll('li')
    .data(attendeesTopEntries)
    .enter().append('li')
    .attr('value', d => valueMapping.indexOf(d.value) + 1)
    .text(d => `${d.key} (${d.value})`);
};

import * as d3 from 'd3';
import compareEntriesByValueAndKey from '../utils/compare-entries-by-value-and-key';
import countSimilarObjects from '../utils/count-similar-objects';
import getAttendees from '../utils/get-attendees';

export default (container, data) => {
  const list = d3.select(container)
  const attendees = getAttendees(data);

  const attendeesTop = countSimilarObjects()
    .key(d => d.name.split(' ').shift())
    .data(attendees);

  const attendeesTopEntries = d3.entries(attendeesTop)
    .sort(compareEntriesByValueAndKey)
    .slice(0, 20);

  list.selectAll('li')
    .data(attendeesTopEntries)
    .enter().append('li')
    .text((d) => `${d.key} (${d.value})`);
};

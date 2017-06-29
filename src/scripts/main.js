import createChartConfig from './utils/chart-config';
import fetchError from './utils/fetch-error';

import createAttendeesChart from './charts/attendees';
import createReturningAttendeesChart from './charts/returning-attendees';
import createTopAttendeesList from './charts/top-attendees';
import createTopFirstNameList from './charts/top-first-names';

import createExpandableList from './components/expandable-list';

const chartAttendees = document.querySelector('.js-chart-attendees');
const chartReturningAttendees = document.querySelector('.js-chart-returning-attendees');
const listTopAttendees = document.querySelector('.js-list-top-attendees');
const listTopFirstNames = document.querySelector('.js-list-top-first-names');

const chartConfig = createChartConfig(chartAttendees.parentElement);

fetch('data/attendees.json')
  .then(fetchError)
  .then(response => response.json())
  .then((response) => {
    createAttendeesChart(chartAttendees, response, chartConfig);
    createReturningAttendeesChart(chartReturningAttendees, response, chartConfig);
    createTopAttendeesList(listTopAttendees, response);
    createTopFirstNameList(listTopFirstNames, response);
  })
  .then(() => {
    createExpandableList(listTopAttendees);
    createExpandableList(listTopFirstNames);
  })
  .catch(console.error);

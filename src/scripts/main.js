import createChartConfig from './utils/chart-config';
import fetchError from './utils/fetch-error';
import createAttendeesChart from './charts/attendees';
import createTopAttendeesList from './charts/top-attendees';
import createTopFirstNameList from './charts/top-first-names';

const chartAttendees = document.querySelector('.js-chart-attendees');
const listTopAttendees = document.querySelector('.js-list-top-attendees');
const listTopFirstNames = document.querySelector('.js-list-top-first-names');

const chartConfig = createChartConfig(chartAttendees.parentElement);

fetch('data/attendees.json')
  .then(fetchError)
  .then(response => response.json())
  .then(response => {
    createAttendeesChart(chartAttendees, response, chartConfig);
    createTopAttendeesList(listTopAttendees, response);
    createTopFirstNameList(listTopFirstNames, response);
  })
  .catch(console.error);

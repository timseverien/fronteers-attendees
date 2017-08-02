import createChartConfig from './utils/chart-config';
import fetchError from './utils/fetch-error';

import createAttendeesChart from './charts/attendees';
import createReturningAttendeesChart from './charts/returning-attendees';
import createTopAttendeesList from './charts/top-attendees';
import createTopFirstNameList from './charts/top-first-names';
import createLoyalAttendees from './charts/loyal-attendees';

import createExpandableList from './components/expandable-list';

const chartAttendees = document.querySelector('.js-chart-attendees');
const chartReturningAttendees = document.querySelector('.js-chart-returning-attendees');
const listTopAttendees = document.querySelector('.js-list-top-attendees');
const listTopFirstNames = document.querySelector('.js-list-top-first-names');
const chartLoyalAttendees = document.querySelector('.js-chart-loyal-attendees');

const chartConfig = createChartConfig(chartAttendees.parentElement);

fetch('data/attendees.json')
  .then(fetchError)
  .then(response => response.json())
  .then((response) => {
    createAttendeesChart(chartAttendees, response, chartConfig);
    createReturningAttendeesChart(chartReturningAttendees, response, chartConfig);
    createTopAttendeesList(listTopAttendees, response);
    createTopFirstNameList(listTopFirstNames, response);
    createLoyalAttendees(chartLoyalAttendees, response, chartConfig)
  })
  .then(() => {
    createExpandableList(listTopAttendees);
    createExpandableList(listTopFirstNames);
  })
  .catch(console.error);

import fetchError from './utils/fetch-error';
import createAttendeesChart from './charts/attendees';

const elementChartContainer = document.querySelector('.js-chart-container');

fetch('data/attendees.json')
  .then(fetchError)
  .then(response => response.json())
  .then(response => createAttendeesChart(elementChartContainer, response))
  .catch(console.error);

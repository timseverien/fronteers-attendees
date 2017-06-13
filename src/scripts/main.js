import fetchError from './utils/fetch-error';

fetch('data/attendees/json')
  .then(fetchError)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(console.error);

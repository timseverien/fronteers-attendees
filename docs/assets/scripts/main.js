(function () {
'use strict';

var fetchError = (response) => {
  if (!response.ok) {
    return Promise.reject(new Error(response.statusText));
  }

  Promise.resolve(response);
};

fetch('data/attendees/json')
  .then(fetchError)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(console.error);

}());

(function () {
'use strict';

var fetchError = function (response) {
  if (!response.ok) {
    return Promise.reject(new Error(response.statusText));
  }

  Promise.resolve(response);
};

fetch('data/attendees/json')
  .then(fetchError)
  .then(function (response) { return response.json(); })
  .then(function (response) { return console.log(response); })
  .catch(console.error);

}());

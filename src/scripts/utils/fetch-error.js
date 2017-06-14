export default (response) => {
  if (!response.ok) {
    return Promise.reject(new Error(response.statusText));
  }

  return response;
};

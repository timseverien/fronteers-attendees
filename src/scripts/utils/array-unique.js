export default (arr, value) => {
  if (arr.indexOf(value) === -1) {
    arr.push(value);
  }

  return arr;
};

export default () => {
  let getKey = d => d;

  return {
    key(f) {
      getKey = f;
      return this;
    },

    data(data) {
      return data.reduce((obj, attendee) => {
        const key = getKey(attendee);

        if (!(key in obj)) {
          obj[key] = 0;
        }

        obj[key]++;

        return obj;
      }, {});
    },
  };
};

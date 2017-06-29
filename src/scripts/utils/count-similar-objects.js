export default () => {
  let getKey = d => d;

  return {
    key(f) {
      getKey = f;
      return this;
    },

    data(data) {
      return data.reduce((obj, item) => {
        const key = getKey(item);

        if (!(key in obj)) {
          obj[key] = 0;
        }

        obj[key]++;

        return obj;
      }, {});
    },
  };
};

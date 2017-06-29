export default (accessor) => {
  const getSmallestArray = (a, b) => a.length < b.length ? a : b;
  const getLargestArray = (a, b) => a.length > b.length ? a : b;

  return {
    data(a, b) {
      const c = getSmallestArray(a, b);
      const d = getLargestArray(a, b);

      return d.reduce((equalObjectCount, value) => {
        const key = accessor(value);
        const isInOtherArray = c.some(d => key === accessor(d));

        if (isInOtherArray) {
          return equalObjectCount + 1;
        }

        return equalObjectCount;
      }, 0) / d.length;
    },
  };
};

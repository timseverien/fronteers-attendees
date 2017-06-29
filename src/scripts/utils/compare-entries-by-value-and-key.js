export default (a, b) => {
  const diff = b.value - a.value;

  if (diff === 0) {
    return a.key.localeCompare(b.key);
  }

  return diff;
};

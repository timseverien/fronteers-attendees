const padding = 16;

export default (container) => {
  const width = container.clientWidth;
  const height = width * .5;

  return {
    height,
    heightInner: height - padding * 2,
    padding,
    width,
    widthInner: width - padding * 2,
  };
};

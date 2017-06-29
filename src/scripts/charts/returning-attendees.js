import * as d3 from 'd3';
import getDataSimilarityRatio from '../utils/array-similarity-ratio';

export default (container, data, config) => {
  const {
    height,
    heightInner,
    padding,
    width,
    widthInner,
  } = config;

  const returningAttendees = data.map((edition, i) => {
    if (i === 0) return 0;

    const previousEdition = data[i - 1];

    return getDataSimilarityRatio(d => d.name)
      .data(edition.attendees, previousEdition.attendees);
  });

  const barWidth = widthInner / data.length;
  const barWidthHalf = barWidth * .5;
  const fontSize = 16;

  const scaleX = d3.scaleLinear()
    .domain([0, data.length])
    .range([padding, padding + widthInner]);

  const scaleY = d3.scaleLinear()
    .domain([0, 1])
    .range([padding, padding + heightInner - padding]);

  const svg = d3.select(container)
    .attr('height', height)
    .attr('width', width);

  const line = d3.line()
    .x((d, i) => scaleX(i))
    .y(d => scaleY(1) - scaleY(d));

  const entry = svg.selectAll('g')
    .data(returningAttendees)
    .enter().append('g');

  entry.append('path')
    .attr('class', 'chart__line')
    .datum(returningAttendees)
    .attr('d', line);

  entry.append('circle')
    .attr('class', 'chart__line-point')
    .attr('cx', (d, i) => scaleX(i))
    .attr('cy', d => scaleY(1) - scaleY(d))
    .attr('r', 4);

  entry.append('text')
    .attr('class', 'chart__line-value text-middle')
    .attr('x', (d, i) => scaleX(i))
    .attr('y', d => scaleY(1) - scaleY(d) + fontSize * 2)
    .text(d => d3.format('.0%')(d));

  entry.append('text')
    .attr('class', 'text-middle')
    .attr('x', (d, i) => barWidthHalf + scaleX(i))
    .attr('y', scaleY(1) + padding + padding)
    .text((d, i) => i + 2008);
};

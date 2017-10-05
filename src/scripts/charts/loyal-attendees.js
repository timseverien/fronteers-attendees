import * as d3 from 'd3';
import hasAttendee from '../utils/has-attendee';

export default (container, data, config) => {
  const {
    height,
    heightInner,
    padding,
    width,
    widthInner,
  } = config;

  const returningAttendees = data.map((edition, i, editions) => {
    if (i === 0) return 1;

    const firstEdition = editions[0];
    const previousEdition = editions[i - 1];
    let returning = 0;

    edition.attendees.forEach((attendee) => {
      returning += hasAttendee(firstEdition, attendee.name) ? 1 : 0;
    });

    return returning / firstEdition.attendees.length;
  });

  const barWidth = (widthInner / data.length) * .95;
  const barWidthHalf = barWidth * .5;
  const fontSize = 16;

  const scaleX = d3.scaleLinear()
    .domain([0, data.length])
    .range([padding, padding + widthInner]);

  const scaleY = d3.scaleLinear()
    .domain([0, 1])
    .range([padding, padding + heightInner - padding - fontSize]);

  var color = d3.scaleLinear()
    .domain([0, data.length])
    .range(['#00709f', '#009de0']);

  const svg = d3.select(container)
    .attr('height', height)
    .attr('width', width);

  const entry = svg.selectAll('g')
    .data(returningAttendees)
    .enter().append('g');

  entry.append('rect')
    .attr('x', (d, i) => scaleX(i))
    .attr('y', d => scaleY(1) + padding - scaleY(d))
    .attr('fill', (d, i) => color(i))
    .attr('height', d => scaleY(d))
    .attr('width', barWidth);

  entry.append('text')
    .attr('class', 'chart__value text-middle')
    .attr('x', (d, i) => barWidthHalf + scaleX(i))
    .attr('y', scaleY(1))
    .text(d => d3.format('.1%')(d));

  entry.append('text')
    .attr('class', 'text-middle')
    .attr('x', (d, i) => barWidthHalf + scaleX(i))
    .attr('y', scaleY(1) + padding + padding)
    .text((d, i) => i + 2008);
};

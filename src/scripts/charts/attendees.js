import * as d3 from 'd3';

export default (container, data, config) => {
  const {
    height,
    heightInner,
    padding,
    width,
    widthInner,
  } = config;

  const attendeesMax = d3.max(data, d => d.attendees.length);
  const barWidth = widthInner / data.length;
  const barWidthHalf = barWidth * .5;
  const fontSize = 16;

  const scaleX = d3.scaleLinear()
    .domain([0, data.length])
    .range([padding, padding + widthInner]);

  const scaleY = d3.scaleLinear()
    .domain([0, attendeesMax])
    .range([padding, padding + heightInner - padding - fontSize]);

  const svg = d3.select(container)
    .attr('height', height)
    .attr('width', width);

  const entry = svg.selectAll('g')
    .data(data)
    .enter().append('g');

  entry.append('rect')
    .attr('x', (d, i) => scaleX(i))
    .attr('y', d => scaleY(attendeesMax) + padding - scaleY(d.attendees.length))
    .attr('fill', (d, i) => d3.interpolatePlasma(i / data.length))
    .attr('height', d => scaleY(d.attendees.length))
    .attr('width', barWidth);

  entry.append('text')
    .attr('x', (d, i) => barWidthHalf + scaleX(i))
    .attr('y', scaleY(attendeesMax) + padding + padding)
    .attr('text-anchor', 'middle')
    .text((d, i) => i + 2008);
};

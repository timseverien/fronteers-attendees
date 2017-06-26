import * as d3 from 'd3';

const padding = 20;

export default (container, data) => {
  const height = 256;
  const heightInner = height - padding * 2;
  const width = container.parentNode.clientWidth;
  const widthInner = width - padding * 2;

  const barWidth = widthInner / data.length;
  const barWidthHalf = barWidth * .5;

  const attendeesMax = d3.max(data, d => d.attendees.length);

  const c = d3.hsl(20, 0.5, 0.5);

  const scaleX = d3.scaleLinear()
    .domain([0, data.length])
    .range([padding, padding + widthInner]);

  const scaleY = d3.scaleLinear()
    .domain([0, attendeesMax])
    .range([padding, padding + heightInner]);

  const svg = d3.select(container)
    .attr('height', height)
    .attr('width', width);

  const entry = svg.selectAll('g')
    .data(data)
    .enter().append('g');

  entry.append('rect')
    .attr('x', (d, i) => scaleX(i))
    .attr('y', d => (padding + heightInner) - scaleY(d.attendees.length))
    .attr('fill', (d, i) => d3.interpolatePlasma(i / data.length))
    .attr('height', d => scaleY(d.attendees.length))
    .attr('width', barWidth);

  entry.append('text')
    .attr('x', (d, i) => barWidthHalf + scaleX(i))
    .attr('y', padding + heightInner + 20)
    .attr('text-anchor', 'middle')
    .text((d, i) => i + 2008);
};

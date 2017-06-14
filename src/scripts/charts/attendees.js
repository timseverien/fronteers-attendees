import * as d3 from 'd3';

export default (container, data) => {
  const attendeesMax = d3.max(data, d => d.attendees.length);

  const scaleX = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, 100]);

  const scaleY = d3.scaleLinear()
    .domain([0, attendeesMax])
    .range([0, 100]);

  const barWidth = `${100 / data.length}%`;

  d3.select(container)
    .selectAll('rect')
    .data(data)
    .enter().append('rect')
      .attr('x', (d, i) => `${scaleX(i)}%`)
      .attr('y', d => `${100 - scaleY(d.attendees.length)}%`)
      .attr('height', d => `${scaleY(d.attendees.length)}%`)
      .attr('width', barWidth);
};

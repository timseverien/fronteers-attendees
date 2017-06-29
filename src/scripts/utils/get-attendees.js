export default data => data.reduce((total, d) => total.concat(d.attendees), []);

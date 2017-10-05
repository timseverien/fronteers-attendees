export default (edition, name) => edition.attendees
  .some(attendee => attendee.name === name);

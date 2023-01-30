/* eslint-disable import/prefer-default-export */
function formatDate(dateString) {
  let [date, time] = dateString.split('T');
  // first 5 chars is hours, semicolon, minutes
  time = time.slice(0, 5);
  date = date.split('-').join('.');
  return { time, date };
}

function getFullName({ name, surname, lastName }) {
  return `${surname} ${name} ${lastName}`;
}

function isValidDate(d) {
  // eslint-disable-next-line no-restricted-globals
  return d instanceof Date && !isNaN(d);
}

export { formatDate, getFullName, isValidDate };

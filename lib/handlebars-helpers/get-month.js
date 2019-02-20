const months = require('months');

/**
 *
 * @param   {String} val Number of the month.
 * @returns {String}     Name of the month.
 */
const getMonth = val => {
  const num = parseInt(val, 10) - 1;
  return months[num] ? months[num] : '[Month]';
};

module.exports = getMonth;

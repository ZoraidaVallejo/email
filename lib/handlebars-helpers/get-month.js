const months = require('months');

/**
 *
 * @param {*} val
 */
const getMonth = val => {
  const num = parseInt(val, 10) - 1;
  return months[num] ? months[num] : '[Month]';
};

module.exports = getMonth;

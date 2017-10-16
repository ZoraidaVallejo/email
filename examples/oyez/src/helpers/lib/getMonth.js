const months = require('months');

module.exports = function getMonth(val) {
  const num = parseInt(val, 10) - 1;
  return months[num] ? months[num] : '[Month]';
};

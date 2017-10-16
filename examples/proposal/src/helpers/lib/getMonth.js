const months = require('months');

module.exports = function getMonth(val) {
  const _num = parseInt(val) - 1;
  return months[_num] ? months[_num] : '[Month]';
};

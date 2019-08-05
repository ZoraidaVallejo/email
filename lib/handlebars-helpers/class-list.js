const concat = require('./concat');

/**
 * Joins all the given CSS classes.
 * @param {...string} vals - Array of CSS classes.
 * @returns {string} Full string separated by spaces.
 */
function classList(...vals) {
  const props = [...new Set(vals)];
  props[props.length - 1].hash.separator = ' ';

  return concat(...props);
}

module.exports = classList;

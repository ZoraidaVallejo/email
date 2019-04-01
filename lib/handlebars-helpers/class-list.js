const concat = require('./concat');

/**
 * Joins all the given CSS classes.
 * @param   {...String} vals Array of CSS classes.
 * @returns {String}         Full string separated by spaces.
 */
const classList = (...vals) => {
  const props = [...new Set(vals)];
  props[props.length - 1].hash.separator = ' ';

  return concat(...props);
};

module.exports = classList;

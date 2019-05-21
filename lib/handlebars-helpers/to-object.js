const { reverseObject } = require('../helpers');

/**
 * Parses the given attributes to inline CSS.
 * @param   {Object} options Built-in handlebar options.
 * @returns {Object}         Object.
 */
function toObject(options) {
  return reverseObject(options.hash);
}

module.exports = toObject;

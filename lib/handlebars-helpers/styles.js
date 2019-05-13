const { inlineStyles, reverseObject } = require('../helpers');

/**
 * Parses the given attributes to inline CSS.
 * @param   {Object} options Built-in handlebar options.
 * @returns {String}         CSS.
 */
function styles(options) {
  return inlineStyles(reverseObject(options.hash));
}

module.exports = styles;

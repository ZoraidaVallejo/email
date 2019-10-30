const { parseHtmlAttributes, reverseObject } = require('../helpers');

/**
 * Parses the given attributes to HTML attributes.
 * @param {Object} options - Built-in handlebar options.
 * @returns {string} HTML attributes.
 */
function htmlAttr(options) {
    const result = parseHtmlAttributes(reverseObject(options.hash));

    if (typeof options.hash.debug != 'undefined') {
        // eslint-disable-next-line no-console
        console.log(`\nAttributes:\n${result}\n`);
    }

    return result;
}

module.exports = htmlAttr;

const getUnit = require('./get-unit');

// TODO: Add to the documentation.

/**
 * Parses the given attributes to inline CSS.
 * @param {number} number - Number to add the pixels unit.
 * @returns {string} Number of pixels as a string.
 */
function toPx(number) {
    if (!number) {
        return null;
    }

    if (getUnit(number)) {
        return number;
    }

    return `${number}px`;
}

module.exports = toPx;

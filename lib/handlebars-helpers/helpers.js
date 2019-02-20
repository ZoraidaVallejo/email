const kebabCase = require('kebab-case');

/**
 * Checks whether or not is a valid value.
 * @param   {*}       val Value.
 * @returns {Boolean}
 */
const validValue = val => !(typeof val === 'undefined' || !val || String(val).trim() === '');

/**
 * Joins the given object into an string of HTML attributes.
 * @param   {Object} attributesObj Configuration object.
 * @returns {String}               HTML attributes.
 */
const htmlAttrs = attributesObj =>
  Object.keys(attributesObj)
    .map(atr => (validValue(attributesObj[atr]) ? `${kebabCase(atr)}="${attributesObj[atr]}"` : ''))
    .filter(val => val !== '')
    .join(' ');

/**
 * Joins the given object into an string of CSS properties.
 * @param {Object} stylesObj Configuration object.
 * @returns {String}         CSS properties.
 */
const inlineStyles = stylesObj =>
  Object.keys(stylesObj)
    .map(prop => (validValue(stylesObj[prop]) ? `${kebabCase(prop)}:${stylesObj[prop]}` : ''))
    .filter(val => val !== '')
    .join(';');

module.exports = {
  validValue,
  htmlAttrs,
  inlineStyles
};

const font = require('css-font');
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
 * Converts number to pixels.
 * @param   {Number} num Number.
 * @returns {String}
 */
const toPx = num => (typeof num === 'number' ? `${num}px` : num);

/**
 * Joins the given object into an string of CSS properties.
 * @param   {Object} stylesObj Configuration object.
 * @returns {String}           CSS properties.
 */
const inlineStyles = stylesObj =>
  Object.keys(stylesObj)
    .map(prop => {
      const value = stylesObj[prop];

      if (validValue(value)) {
        if (prop === 'font') {
          return `font:${font.stringify(value)}`;
        }

        return `${kebabCase(prop)}:${value}`;
      }

      return '';
    })
    .filter(val => val !== '')
    .join(';');

/**
 * Converts any number as string to an actual number.
 * @param   {Object} obj
 * @returns {Object}
 */
const o2n = obj => {
  const res = {};

  Object.keys(obj).forEach(key => {
    const val = parseInt(obj[key], 10);

    res[key] = val || obj[key];
  });

  return res;
};

module.exports = {
  validValue,
  htmlAttrs,
  inlineStyles,
  toPx,
  o2n
};

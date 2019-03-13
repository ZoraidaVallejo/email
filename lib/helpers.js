const font = require('css-font');
const kebabCase = require('kebab-case');
const addPx = require('add-px-to-style');

/**
 * UTM variables main order.
 */
const utmVarsOrder = ['medium', 'campaign', 'source', 'content', 'term'];

/**
 * Given a number, returns a string with said number, expressed with at least a fixed number of digits.
 * @param   {Number} number       Number.
 * @param   {Number} targetLength Number of digits.
 * @returns {String}              Padded number.
 */
const leftPad = (number, targetLength = 2) => {
  let output = String(number);

  while (output.length < targetLength) {
    output = `0${output}`;
  }

  return output;
};

/**
 * Checks whether or not the given value is valid.
 * It will check if is not undefined, `false` or an empty string.
 * @param   {*}       val Value.
 * @returns {Boolean}
 */
const validValue = val => !(typeof val === 'undefined' || !val || String(val).trim() === '');

/**
 * Joins the given object into an string of HTML attributes.
 * @param   {Object} attributesObj Configuration object.
 * @returns {String}               HTML attributes.
 */
const parseHtmlAttributes = attributesObj =>
  Object.keys(attributesObj)
    .map(attr => {
      const val = attributesObj[attr];

      if (attributesObj.debug) {
        // eslint-disable-next-line no-console
        console.log(`${attr}:`, val);
      }

      return validValue(val) && attr !== 'debug' ? `${kebabCase(attr)}="${val}"` : '';
    })
    .filter(val => val !== '')
    .join(' ');

/**
 * Joins the given object into an string of CSS properties.
 * @param   {Object} stylesObj Configuration object.
 * @returns {String}           CSS properties.
 */
const inlineStyles = stylesObj =>
  Object.keys(stylesObj)
    .map(prop => {
      const cssVal = stylesObj[prop];
      const cssProp = kebabCase(prop);

      if (validValue(cssVal)) {
        if (cssProp === 'font') {
          return `${cssProp}:${font.stringify(cssVal)}`;
        }

        return `${cssProp}:${addPx(prop, cssVal)}`;
      }

      return '';
    })
    .filter(val => val !== '')
    .join(';');

/**
 * Loops through the object and converts any stringed number to an actual number.
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

/**
 * Reverses the order of the keys of the given object.
 * @param   {Obejct} obj Object to reverse.
 * @returns {Object}     New object.
 */
const reverseObject = obj => {
  var keys = [];
  var values = [];
  var newObj = {};

  Object.keys(obj).forEach((key, index) => {
    keys[index] = key;
    values[index] = obj[key];
  });

  for (let i = keys.length - 1; i >= 0; i -= 1) {
    newObj[keys[i]] = values[i];
  }

  return newObj;
};

module.exports = {
  utmVarsOrder,
  leftPad,
  validValue,
  parseHtmlAttributes,
  inlineStyles,
  o2n,
  reverseObject
};

const font = require('css-font');
const kebabCase = require('kebab-case');
const addPx = require('add-px-to-style');

/**
 * UTM variables main order.
 */
const utmVarsOrder = ['medium', 'campaign', 'source', 'content', 'term'];

/**
 * Given a number, returns a string with said number, expressed with at least a fixed number of digits.
 * @param   {Number} number           Number.
 * @param   {Number} [targetLength=2] Number of digits.
 * @returns {String}                  Padded number.
 */
function leftPad(number, targetLength = 2) {
  let output = String(number);

  while (output.length < targetLength) {
    output = `0${output}`;
  }

  return output;
}

/**
 * Checks whether or not the given value is valid.
 * It will check if is not undefined, `false` or an empty string.
 * @param   {*}       value Value.
 * @returns {Boolean}
 */
function validValue(value) {
  return !(typeof value == 'undefined' || !value || String(value).trim() == '');
}

/**
 * Joins the given object into an string of HTML attributes.
 * @param   {Object} attributesObj Configuration object.
 * @returns {String}               HTML attributes.
 */
function parseHtmlAttributes(attributesObj) {
  return Object.keys(attributesObj)
    .map(function convertToAttr(attr) {
      const val = attributesObj[attr];
      const realAttr = attr == 'className' ? 'class' : attr;

      if (attributesObj.debug) {
        // eslint-disable-next-line no-console
        console.log(`${realAttr}:`, val);
      }

      return validValue(val) && realAttr != 'debug' ? `${kebabCase(realAttr)}="${val}"` : '';
    })
    .filter(function checkEmpty(val) {
      return val != '';
    })
    .join(' ');
}

/**
 * Joins the given object into an string of CSS properties.
 * @param   {Object} stylesObj Configuration object.
 * @returns {String}           CSS properties.
 */
function inlineStyles(stylesObj) {
  return Object.keys(stylesObj)
    .map(function convertToCss(prop) {
      const cssVal = stylesObj[prop];
      const cssProp = kebabCase(prop);

      if (validValue(cssVal)) {
        if (cssProp == 'font') {
          return `${cssProp}:${font.stringify(cssVal)}`;
        }

        return `${cssProp}:${addPx(prop, cssVal)}`;
      }

      return '';
    })
    .filter(function checkEmpty(val) {
      return val != '';
    })
    .join(';');
}

/**
 * Loops through the object and converts any stringed number to an actual number.
 * @param   {Object} obj
 * @returns {Object}
 */
function o2n(obj) {
  const res = {};

  Object.keys(obj).forEach(function eachKey(key) {
    const val = parseFloat(obj[key]);

    res[key] = val || obj[key];
  });

  return res;
}

/**
 * Reverses the order of the keys of the given object.
 * @param   {Obejct} obj Object to reverse.
 * @returns {Object}     New object.
 */
function reverseObject(obj) {
  var keys = [];
  var values = [];
  var newObj = {};

  // TODO: Function expression.
  Object.keys(obj).forEach(function eachKey(key, index) {
    keys[index] = key;
    values[index] = obj[key];
  });

  for (let i = keys.length - 1; i >= 0; i -= 1) {
    newObj[keys[i]] = values[i];
  }

  return newObj;
}

module.exports = {
  utmVarsOrder,
  leftPad,
  validValue,
  parseHtmlAttributes,
  inlineStyles,
  o2n,
  reverseObject
};

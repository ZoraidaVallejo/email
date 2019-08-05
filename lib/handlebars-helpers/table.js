const util = require('handlebars-utils');
const { parseHtmlAttributes, reverseObject } = require('../helpers');
const defaultTableAttributes = require('./table/default-attributes');

/**
 * Generates attributes for the `<table>` element.
 * @param {Object} options - Built-in handlebar options.
 * @returns {string} `<table>` attributes.
 */
function tableAttr(options) {
  const opts = options;
  opts.hash = Object.assign({}, defaultTableAttributes, reverseObject(opts.hash));

  const result = parseHtmlAttributes(opts.hash);

  if (typeof opts.hash.debug != 'undefined') {
    // eslint-disable-next-line no-console
    console.log(`\nAttributes:\n${result}\n`);
  }

  return result;
}

/**
 * Generates a `<table>` element with default attributes.
 * @param {Object} options - Built-in handlebar options.
 * @returns {string} `<table>` element.
 */
function table(options) {
  return `
    <table ${tableAttr(options)}>
      ${util.value(true, this, options)}
    </table>
  `;
}

module.exports = {
  table,
  tableAttr
};

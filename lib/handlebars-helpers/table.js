const util = require('handlebars-utils');
const helpers = require('handlebars-helpers');

const { attr } = helpers();

/**
 * Default attributes and their corresponding values to table HTML elements.
 */
const defaultTableAttributes = {
  border: '0',
  cellpadding: '0',
  cellspacing: '0',
  align: 'center',
  width: '100%'
};

/**
 * Generates attributes for the `<table>` element.
 * @param   {Object} options Built-in handlebar options.
 * @returns {String}         `<table>` attributes.
 */
function tableAttr(options) {
  const opts = options;

  opts.hash = Object.assign({}, defaultTableAttributes, opts.hash);

  Object.keys(opts.hash).forEach(atr => {
    const val = opts.hash[atr];

    if (opts.hash.debug) {
      // eslint-disable-next-line no-console
      console.log(`${atr}:`, val);
    }

    if (typeof val === 'undefined' || !val || String(val).trim() === '') {
      delete opts.hash[atr];
    }
  });

  if (typeof opts.hash.debug !== 'undefined') {
    delete opts.hash.debug;

    // eslint-disable-next-line no-console
    console.log(`\nAttributes:\n${attr(opts)}\n`);
  }

  return attr(opts).trim();
}

/**
 * Generates a `<table>` element with default attributes.
 * @param   {Object} options Built-in handlebar options.
 * @returns {String}         `<table>` element.
 */
function table(options) {
  return `<table ${tableAttr(options)}>\n${util.value(true, this, options)}\n</table>\n`;
}

module.exports = {
  tableAttr,
  table
};

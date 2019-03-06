const util = require('handlebars-utils');
const helpers = require('handlebars-helpers');
const { validValue } = require('../helpers');
const defaultTableAttributes = require('./table/default-attributes');

const { attr } = helpers();

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

    if (!validValue(val)) {
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

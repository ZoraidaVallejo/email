const util = require('handlebars-utils');
const helpers = require('handlebars-helpers');

const { attr } = helpers();

/**
 * Generates a `<table>` HTML element with default attributes.
 * @param {Object} options Built-in handlebar options.
 */
function table(options) {
  const opts = options;
  const defaults = {
    border: '0',
    cellpadding: '0',
    cellspacing: '0',
    align: 'center',
    width: '100%'
  };

  opts.hash = Object.assign({}, defaults, opts.hash);

  if (opts.hash.debug) {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(opts.hash, null, 2));
  }

  Object.keys(opts.hash).forEach(atr => {
    const val = opts.hash[atr];

    if (typeof val === 'undefined' || String(val).trim() === '') {
      delete opts.hash[atr];
    }
  });

  if (typeof opts.hash.debug !== 'undefined') {
    delete opts.hash.debug;

    // eslint-disable-next-line no-console
    console.log(`\nAttributes:\n${attr(opts)}\n`);
  }

  return `<table ${attr(opts)}>\n${util.value(true, this, opts)}\n</table>\n`;
}

module.exports = table;

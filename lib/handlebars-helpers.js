const util = require('handlebars-utils');
const helpers = require('handlebars-helpers');

const concat = require('./handlebars-helpers/concat');
const assign = require('./handlebars-helpers/assign');
const getMonths = require('./handlebars-helpers/get-month');
const utmVariables = require('./handlebars-helpers/utm-variables');
const resolveFilePath = require('./handlebars-helpers/resolve-file-path');
const getUnit = require('./handlebars-helpers/get-unit');

const { attr } = helpers();

module.exports.register = Handlebars => {
  Handlebars.registerHelper('getMonth', getMonths);

  Handlebars.registerHelper('utmVariables', utmVariables);

  Handlebars.registerHelper('assign', assign);

  Handlebars.registerHelper('resolveFilePath', resolveFilePath);

  Handlebars.registerHelper('concat', concat);

  Handlebars.registerHelper('getUnit', getUnit);

  Handlebars.registerHelper('table', function table(options) {
    const opts = options;
    const defaults = {
      border: '0',
      cellpadding: '0',
      cellspacing: '0',
      align: 'center',
      width: '100%'
    };

    opts.hash = Object.assign({}, defaults, opts.hash);

    Object.keys(opts.hash).forEach(atr => {
      const val = opts.hash[atr];

      if (typeof val === 'undefined' || val.trim() === '') {
        delete opts.hash[atr];
      }
    });

    return `<table ${attr(opts)}>\n${util.value(true, this, opts)}\n</table>\n`;
  });
};

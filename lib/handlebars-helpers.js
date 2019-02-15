const { tableAttr, table } = require('./handlebars-helpers/table');
const concat = require('./handlebars-helpers/concat');
const assign = require('./handlebars-helpers/assign');
const getUnit = require('./handlebars-helpers/get-unit');
const getMonths = require('./handlebars-helpers/get-month');
const utmVariables = require('./handlebars-helpers/utm-variables');
const resolveFilePath = require('./handlebars-helpers/resolve-file-path');

module.exports.register = Handlebars => {
  Handlebars.registerHelper('getMonth', getMonths);

  Handlebars.registerHelper('utmVariables', utmVariables);

  Handlebars.registerHelper('assign', assign);

  Handlebars.registerHelper('resolveFilePath', resolveFilePath);

  Handlebars.registerHelper('concat', concat);

  Handlebars.registerHelper('getUnit', getUnit);

  Handlebars.registerHelper('tableAttr', tableAttr);

  Handlebars.registerHelper('table', table);
};

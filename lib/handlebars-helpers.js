const concat = require('./handlebars-helpers/concat');
const assign = require('./handlebars-helpers/assign');
const styles = require('./handlebars-helpers/styles');
const ternary = require('./handlebars-helpers/ternary');
const getUnit = require('./handlebars-helpers/get-unit');
const htmlAttr = require('./handlebars-helpers/html-attr');
const getMonth = require('./handlebars-helpers/get-month');
const classList = require('./handlebars-helpers/class-list');
const utmVariables = require('./handlebars-helpers/utm-variables');
const resolveFilePath = require('./handlebars-helpers/resolve-file-path');
const { tableAttr, table } = require('./handlebars-helpers/table');
const uiButton = require('./handlebars-helpers/ui-button');

module.exports.register = Handlebars => {
  Handlebars.registerHelper('getMonth', getMonth);
  Handlebars.registerHelper('utmVariables', utmVariables);
  Handlebars.registerHelper('assign', assign);
  Handlebars.registerHelper('resolveFilePath', resolveFilePath);
  Handlebars.registerHelper('concat', concat);
  Handlebars.registerHelper('classList', classList);
  Handlebars.registerHelper('getUnit', getUnit);
  Handlebars.registerHelper('htmlAttr', htmlAttr);
  Handlebars.registerHelper('tableAttr', tableAttr);
  Handlebars.registerHelper('table', table);
  Handlebars.registerHelper('uiButton', uiButton);
  Handlebars.registerHelper('ternary', ternary);
  Handlebars.registerHelper('styles', styles);
  Handlebars.registerHelper('toObject', options => options.hash);
};

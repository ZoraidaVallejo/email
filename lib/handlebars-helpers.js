const toPx = require('./handlebars-helpers/to-px');
const assign = require('./handlebars-helpers/assign');
const concat = require('./handlebars-helpers/concat');
const styles = require('./handlebars-helpers/styles');
const getUnit = require('./handlebars-helpers/get-unit');
const ternary = require('./handlebars-helpers/ternary');
const toObject = require('./handlebars-helpers/to-object');
const htmlAttr = require('./handlebars-helpers/html-attr');
const classList = require('./handlebars-helpers/class-list');
const utmVariables = require('./handlebars-helpers/utm-variables');
const resolveFilePath = require('./handlebars-helpers/resolve-file-path');
const chunks = require('./handlebars-helpers/chunks');
const { tableAttr, table } = require('./handlebars-helpers/table');
const uiButton = require('./handlebars-helpers/ui-button');

module.exports.register = function setHelpers(Handlebars) {
  // Functions
  Handlebars.registerHelper('toPx', toPx);
  Handlebars.registerHelper('assign', assign);
  Handlebars.registerHelper('concat', concat);
  Handlebars.registerHelper('styles', styles);
  Handlebars.registerHelper('getUnit', getUnit);
  Handlebars.registerHelper('ternary', ternary);
  Handlebars.registerHelper('toObject', toObject);
  Handlebars.registerHelper('htmlAttr', htmlAttr);
  Handlebars.registerHelper('tableAttr', tableAttr);
  Handlebars.registerHelper('classList', classList);
  Handlebars.registerHelper('utmVariables', utmVariables);
  Handlebars.registerHelper('resolveFilePath', resolveFilePath);
  Handlebars.registerHelper('chunks', chunks);

  // Helpers
  Handlebars.registerHelper('table', table);
  Handlebars.registerHelper('uiButton', uiButton);
};

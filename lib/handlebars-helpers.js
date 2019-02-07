const assign = require('./handlebars-helpers/assign');
const getMonths = require('./handlebars-helpers/get-month');
const utmVariables = require('./handlebars-helpers/utm-variables');
const resolveFilePath = require('./handlebars-helpers/resolve-file-path');

module.exports.register = Handlebars => {
  Handlebars.registerHelper('getMonth', getMonths);

  Handlebars.registerHelper('utmVariables', utmVariables);

  Handlebars.registerHelper('assign', assign);

  Handlebars.registerHelper('resolveFilePath', resolveFilePath);

  Handlebars.registerHelper('concat', (...vals) => {
    vals.pop();

    return vals.join('');
  });
};

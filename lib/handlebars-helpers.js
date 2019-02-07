const getMonths = require('./handlebars-helpers/get-month');
const utmVariables = require('./handlebars-helpers/utm-variables');
const assign = require('./handlebars-helpers/assign');

module.exports.register = Handlebars => {
  Handlebars.registerHelper('getMonth', getMonths);

  Handlebars.registerHelper('utmVariables', utmVariables);

  Handlebars.registerHelper('assign', assign);

  Handlebars.registerHelper('concat', (...vals) => {
    vals.pop();

    return vals.join('');
  });
};

const getMonths = require('./handlebars-helpers/get-month');
const utmVariables = require('./handlebars-helpers/utm-variables');

module.exports.register = Handlebars => {
  Handlebars.registerHelper('getMonth', val => getMonths(val));

  Handlebars.registerHelper('utmVariables', val => utmVariables(val));

  Handlebars.registerHelper('concat', (...vals) => {
    vals.pop();

    return vals.join('');
  });
};

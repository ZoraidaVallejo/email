const getMonths = require('./handlebars-helpers/getMonth');

module.exports.register = Handlebars => {
  Handlebars.registerHelper('getMonth', val => getMonths(val));

  Handlebars.registerHelper('concat', (...vals) => {
    vals.pop();

    return vals.join('');
  });
};

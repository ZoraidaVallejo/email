const getMonths = require('./lib/getMonth');

module.exports.register = function(Handlebars, options) {
  Handlebars.registerHelper('getMonth', val => getMonths(val));
};

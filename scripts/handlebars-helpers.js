const getMonths = require('./handlebars-helpers/getMonth');

module.exports.register = Handlebars => {
  Handlebars.registerHelper('getMonth', val => getMonths(val));

  Handlebars.registerHelper('concat', () => {
    var arg = Array.prototype.slice.call(arguments, 0);
    arg.pop();

    return arg.join('');
  });
};

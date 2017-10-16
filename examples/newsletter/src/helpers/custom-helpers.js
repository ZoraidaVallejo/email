'use strict';

const getMonths = require('./lib/getMonth');

module.exports.register = function(Handlebars, options) {
  Handlebars.registerHelper('getMonth', function(val) {
    return getMonths(val);
  });

  Handlebars.registerHelper('concat', function() {
    var arg = Array.prototype.slice.call(arguments, 0);

    arg.pop();
    return arg.join('');
  });
};

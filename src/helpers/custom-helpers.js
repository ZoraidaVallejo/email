'use strict';

var isEven = require('is-even');
var isOdd = require('is-odd');

module.exports.register = function(Handlebars, options) {

    Handlebars.registerHelper('ifEven', function(num, options) {
        return isEven(num) ? options.fn(this) : options.inverse(this);
    });

    Handlebars.registerHelper('ifOdd', function(val, options) {
        return isOdd(val) ? options.fn(this) : options.inverse(this);
    });
};

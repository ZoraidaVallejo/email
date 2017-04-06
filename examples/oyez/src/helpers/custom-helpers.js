'use strict';

const getMonths = require('./lib/getMonth');

module.exports.register = function(Handlebars, options) {

    Handlebars.registerHelper('getMonth', function(val) {
        return getMonths(val);
    });
};

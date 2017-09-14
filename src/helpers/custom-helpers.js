'use strict';

const getMonths = require('./lib/getMonth');

module.exports.register = function(Handlebars, options) {

    Handlebars.registerHelper('getMonth', function(val) {
        return getMonths(val);
    });

    Handlebars.registerHelper('getID', function(link) {
        const id = link.replace(/https:\/\/www.oyez.org\/cases\/\d{4}\/(\d{2,}-\d{3,})/, '$1');
        return id.replace(/-/, '');
    });

    Handlebars.registerHelper('concat', function() {
        var arg = Array.prototype.slice.call(arguments, 0);

        arg.pop();
        return arg.join('');
    });
};

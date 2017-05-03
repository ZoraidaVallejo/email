'use strict';

const getMonths = require('./lib/getMonth');

module.exports.register = function(Handlebars, options) {

    Handlebars.registerHelper('getMonth', function(val) {
        return getMonths(val);
    });

    Handlebars.registerHelper('concat', function(...args) {
        var arg = Array.prototype.slice.call(args, 0);

        arg.pop();
        return arg.join('');
    });

    Handlebars.registerHelper('times', function(n, block) {
        var accum = '';

        for (var i = 0; i < n; ++i) {
            block.data.index = i + 1;
            block.data.isFirst = i === 0;
            block.data.isLast = i === (n - 1);
            accum += block.fn(this);
        }

        return accum;
    });

    Handlebars.registerHelper('for', function(from, to, incr, block) {
        var accum = '';

        for (var i = from; i < to; i += incr) {
            accum += block.fn(i);
        }

        return accum;
    });
};

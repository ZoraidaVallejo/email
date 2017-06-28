'use strict';

const months = require('months');

module.exports = function getMonth(val) {
    let _num = parseInt(val) - 1;
    return months[_num] ? months[_num] : '[Month]';
};

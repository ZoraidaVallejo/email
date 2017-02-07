'use strict';

const customConfig = require('./custom-config.json');
const chalk = require('chalk');
const getMonths = require('./src/helpers/lib/getMonth');

module.exports = function(grunt) {
    let monthNum = parseInt(customConfig.current_month);

    if (monthNum < 1 || monthNum > 12) {
        console.log('');
        grunt.log.writeln(chalk.yellow('Warning: Please set the month number between 01 to 12 in the ' + chalk.underline('custom-config.json') + ' file.'));
        console.log('');
    }

    // const allRules = customConfig;
    const allRules = Object.assign({}, customConfig, {
        current_month_string: getMonths(monthNum)
    });

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    require('load-grunt-config')(grunt, {

        // Pass data to tasks
        data: allRules,

        jitGrunt: {

            staticMappings: {
                juice: 'grunt-juice-email',
                sasslint: 'grunt-sass-lint'
            }
        }
    });
};

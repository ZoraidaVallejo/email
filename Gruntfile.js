/* eslint-disable no-console */

const chalk = require('chalk');
const timeGrunt = require('time-grunt');
const loadGruntConfig = require('load-grunt-config');

const customConfig = require('./custom-config.json');
const getMonths = require('./src/helpers/lib/getMonth');
const $ = require('./scripts/helpers');

const monthNum = parseInt(customConfig.current_month, 10);

if (monthNum < 1 || monthNum > 12) {
  $.log.info(`Please set the month number between 01 to 12 in the ${chalk.underline('custom-config.json')} file.\n`);
}

const configuration = Object.assign({}, customConfig, { current_month_string: getMonths(monthNum) });

module.exports = grunt => {
  // Time how long tasks take. Can help when optimizing build times
  timeGrunt(grunt);

  loadGruntConfig(grunt, {
    data: configuration,

    // Time how long tasks take. Can help when optimizing build times
    timeGrunt: true,

    // Load only needed packages when a task is called.
    jitGrunt: {
      staticMappings: {
        juice: 'grunt-juice-email',
        spreadsheet: 'grunt/spreadsheet.js'
      }
    }
  });
};

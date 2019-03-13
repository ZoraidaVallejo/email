/* eslint-disable no-console */

const chalk = require('chalk');
const log = require('bilberry/log');
const loadGruntConfig = require('load-grunt-config');

const customConfig = require('./custom-config.json'); // eslint-disable-line import/no-unresolved, node/no-missing-require
const getMonth = require('./lib/handlebars-helpers/get-month');

const monthNum = parseInt(customConfig.currentMonth, 10);
const configuration = Object.assign({}, customConfig, {
  currentMonthString: getMonth(monthNum)
});

if (monthNum < 1 || monthNum > 12) {
  log.info(`Please set the month number between 01 to 12 in the ${chalk.underline('custom-config.json')} file.\n`);
}

module.exports = grunt => {
  loadGruntConfig(grunt, {
    data: configuration,

    // Load only needed packages when a task is called.
    jitGrunt: {
      staticMappings: {
        juice: 'grunt-juice-email'
      }
    }
  });
};

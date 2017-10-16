/* eslint-disable node/no-missing-require, import/no-unresolved */
const customConfig = require('./custom-config.json');
const getMonths = require('./src/helpers/lib/getMonth');
/* eslint-enable node/no-missing-require, import/no-unresolved */

const chalk = require('chalk');
const timeGrunt = require('time-grunt');
const loadGruntConfig = require('load-grunt-config');

module.exports = grunt => {
  const monthNum = parseInt(customConfig.current_month, 10);

  if (monthNum < 1 || monthNum > 12) {
    grunt.log.writeln(
      chalk.yellow(`\nWarning: Please set the month number between 01 to 12 in the ${chalk.underline('custom-config.json')} file.\n`)
    );
  }

  const allRules = Object.assign({}, customConfig, { current_month_string: getMonths(monthNum) });

  // Time how long tasks take. Can help when optimizing build times
  timeGrunt(grunt);

  loadGruntConfig(grunt, {
    // Pass data to tasks
    data: allRules,

    jitGrunt: {
      staticMappings: {
        juice: 'grunt-juice-email',
        spreadsheet: 'grunt/spreadsheet.js'
      }
    }
  });
};

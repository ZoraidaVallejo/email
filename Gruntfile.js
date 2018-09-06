/* eslint-disable no-console */

const chalk = require('chalk');
const log = require('bilberry/log');
const timeGrunt = require('time-grunt');
const loadGruntConfig = require('load-grunt-config');

const customConfig = require('./custom-config.json'); // eslint-disable-line import/no-unresolved, node/no-missing-require
const getMonths = require('./lib/handlebars-helpers/getMonth');

if (!customConfig.version) {
  customConfig.currentYear = customConfig.current_year;
  customConfig.currentMonth = customConfig.current_month;
  customConfig.compressedFileName = customConfig.compressed_file_name;

  customConfig.paths.srcImg = customConfig.paths.src_img;
  customConfig.paths.distImg = customConfig.paths.dist_img;
  customConfig.paths.liveImg = customConfig.paths.live_img;
  customConfig.paths.remoteImgPath = customConfig.paths.remote_img_path;
}

const monthNum = parseInt(customConfig.currentMonth, 10);
const configuration = Object.assign({}, customConfig, {
  [!customConfig.version ? 'current_month_string' : 'currentMonthString']: getMonths(monthNum)
});

if (monthNum < 1 || monthNum > 12) {
  log.info(`Please set the month number between 01 to 12 in the ${chalk.underline('custom-config.json')} file.\n`);
}

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
        juice: 'grunt-juice-email'
      }
    }
  });
};

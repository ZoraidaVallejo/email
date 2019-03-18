// const log = require('bilberry/log');
const path = require('path');
const loadGruntConfig = require('load-grunt-config');
const commonConfig = require('./common/data/config');
const getMonth = require('./lib/handlebars-helpers/get-month');
// eslint-disable-next-line global-require, import/no-dynamic-require
const customConfig = require(process.env.CUSTOM_CONFIG);

const configuration = Object.assign({}, commonConfig, customConfig);

configuration.liveImgPath = path.join(
  'https://justatic.com/v/<%= justaticVersion %>/emails/images',
  configuration.remoteImages
);
configuration.remoteImgPath = path.join('/mnt/files/emails/images', configuration.remoteImages);
configuration.currentMonthString = getMonth(configuration.currentMonth);

console.log(configuration);

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

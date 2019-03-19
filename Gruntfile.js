const path = require('path');
const loadGruntConfig = require('load-grunt-config');
const baseConfig = require('./common/data/config');
const getMonth = require('./lib/handlebars-helpers/get-month');

baseConfig.relativeFolders = {};

Object.keys(baseConfig.folders).forEach(folder => {
  baseConfig.relativeFolders[folder] = path.join(process.env.PROJECT_BASE_PATH, baseConfig.folders[folder]);
});

const projectConfigPath = path.join(baseConfig.relativeFolders.src, 'data/conversionConfig.json');

// eslint-disable-next-line global-require, import/no-dynamic-require
const projectConfig = require(`./${projectConfigPath}`);

const configuration = Object.assign({}, baseConfig, projectConfig);

configuration.liveImgPath = path.join(
  'https://justatic.com/v/<%= justaticVersion %>/emails/images',
  configuration.remoteImages
);
configuration.remoteImgPath = path.join('/mnt/files/emails/images', configuration.remoteImages);
configuration.currentMonthString = getMonth(configuration.currentMonth);
configuration.previewUI = './preview';

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

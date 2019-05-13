const fs = require('fs');
const path = require('path');
const moment = require('moment');
const loadGruntConfig = require('load-grunt-config');
const baseConfig = require('./common/data/config');

// S E T   R E L A T I V E   P A T H S
// -----------------------------------
baseConfig.relativeFolders = {};

// TODO: Function expression.
Object.keys(baseConfig.folders).forEach(folder => {
  baseConfig.relativeFolders[folder] = path.join(process.env.PROJECT_BASE_PATH, baseConfig.folders[folder]);
});

// L O A D   C O N V E R S I O N   C O N F I G
// -------------------------------------------
const projectConfigPath = './'.concat(path.join(baseConfig.relativeFolders.src, 'data/conversionConfig.json'));
process.env.CONVERSION_CONFIG = fs.existsSync(projectConfigPath);

// eslint-disable-next-line global-require, import/no-dynamic-require
const projectConfig = process.env.CONVERSION_CONFIG == 'true' ? require(projectConfigPath) : {};

// M E R G E   O B J E C T S
// -------------------------
const data = Object.assign({}, baseConfig, projectConfig);

// A D D   M O R E   C O N F I G U R A T I O N
// -------------------------------------------
if (data.releaseDate) {
  // Validate given release date.
  const conversionRelaseDate = moment(data.releaseDate).isValid() ? moment(data.releaseDate) : moment();

  // Set date formats.
  // TODO: Function expression.
  Object.keys(data.dateFormat).forEach(name => {
    data.dateFormat[name] = conversionRelaseDate.format(data.dateFormat[name]);
  });
}

// Public URL.
data.liveImgPath = `https://${path.join('justatic.com/v', data.justaticVersion, 'emails/images', data.remoteImages)}`;

// Server path.
data.remoteImgPath = path.join('/mnt/files/emails/images', data.remoteImages);

// I N I T I A L I Z E   G R U N T
// -------------------------------
module.exports = function initGrunt(grunt) {
  loadGruntConfig(grunt, {
    data,

    // Load only needed packages when a task is called.
    jitGrunt: {
      staticMappings: {
        juice: 'grunt-juice-email'
      }
    }
  });
};

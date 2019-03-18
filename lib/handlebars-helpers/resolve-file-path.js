const path = require('path');
const { isWebUri } = require('valid-url');
const baseConfig = require('../../common/data/config');

/**
 * Checks if the given file is a local or a remote file.
 * @param   {String} file Path.
 * @returns {String}
 */
const resolveFilePath = file => {
  if (isWebUri(file)) {
    return file;
  }

  return path.join('..', baseConfig.paths.srcImg, file);
};

module.exports = resolveFilePath;

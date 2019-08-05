const path = require('path');
const { isWebUri } = require('valid-url');
const baseConfig = require('../../common/data/config');

/**
 * Checks if the given file is a local or a remote file.
 * @param {string} file - Path.
 * @returns {string} Resolved path.
 */
function resolveFilePath(file) {
  if (isWebUri(file)) {
    return file;
  }

  return path.join('..', baseConfig.folders.srcImg, file);
}

module.exports = resolveFilePath;

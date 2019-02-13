const path = require('path');
const { isWebUri } = require('valid-url');
const userConfig = require('../../custom-config.json');

/**
 * Local source folder of all images.
 */
const imageDirSrc = path.join('..', userConfig.paths.srcImg);

/**
 * Checks if the given file is a local or a remote file.
 * @param   {String} file Path.
 * @returns {String}
 */
const resolveFilePath = file => {
  if (isWebUri(file)) {
    return file;
  }

  return path.join(imageDirSrc, file);
};

module.exports = resolveFilePath;

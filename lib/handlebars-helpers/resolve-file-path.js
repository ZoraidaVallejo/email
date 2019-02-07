const path = require('path');
const { isWebUri } = require('valid-url');
const userConfig = require('../../custom-config.json');

const imageDirSrc = path.join('..', userConfig.paths.srcImg);

const resolveFilePath = file => {
  if (isWebUri(file)) {
    return file;
  }

  return path.join(imageDirSrc, file);
};

module.exports = resolveFilePath;

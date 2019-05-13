const fs = require('fs');
const path = require('path');
const pB = require('pretty-bytes');
const log = require('bilberry/log');
const urlParse = require('url-parse');
const { utmVarsOrder } = require('./helpers');

/**
 * Creates a new CSV file.
 * @class
 */
class Csv {
  /**
   * Creates a new instance for the CSV file.
   * @constructor
   * @param {String[]} array   Initial array.
   * @param {Object}   options Options.
   */
  constructor(array, options) {
    this.element = array;
    this.tagsPath = options.tagsPath;
    this.localImagesPath = options.localImagesPath;
    this.liveImagesPath = options.liveImagesPath;
  }

  /**
   * Counts unique elements of the current elements array.
   * @param   {String[]} columns Column names where each of the elements within the main array will be placed.
   * @returns {Object}           `this`.
   */
  count(columns = []) {
    this.config = {};
    // TODO: Function expression.
    this.element.forEach(originalValue => {
      const checkArray = Array.isArray(originalValue);
      const mainKey = checkArray ? originalValue[0] : originalValue;

      if (!this.config[mainKey]) {
        this.config[mainKey] = {
          original: checkArray ? originalValue : [originalValue],
          table: {
            count: 0
          }
        };

        if (columns.length > 0) {
          // TODO: Function expression.
          columns.forEach((col, idx) => {
            this.config[mainKey].table[col] = this.config[mainKey].original[idx];
          });
        }
      }

      this.config[mainKey].table.count += 1;

      this.configKeys = Object.keys(this.config);
    });

    return this;
  }

  /**
   * Gets the configuration object.
   * @returns {Object}
   */
  get() {
    return this.config;
  }

  /**
   * Gats the UTM variables of the given column value.
   * @param   {String} columnName Column name to parse.
   * @returns {Object}            `this`.
   */
  getUtmVars(columnName) {
    // TODO: Function expression.
    this.configKeys.forEach(key => {
      const url = urlParse(this.config[key].table[columnName], true);

      // Rewrite original.
      this.config[key].table[columnName] = `${url.href.split('?')[0]}`;

      // TODO: Function expression.
      utmVarsOrder.forEach(utm => {
        const utmKey = `utm_${utm}`;
        this.config[key].table[utmKey] = url.query[utmKey] ? url.query[utmKey] : '';
      });
    });

    return this;
  }

  /**
   * Gets the file size of the given column value.
   * @param {String} columnName Column name to parse.
   * @returns {Object}          `this`.
   */
  getImageSize(columnName) {
    // TODO: Function expression.
    this.configKeys.forEach(key => {
      const imgPath = this.config[key].table[columnName];

      if (imgPath.startsWith(this.liveImagesPath)) {
        const localImage = path.join(this.localImagesPath, path.relative(this.liveImagesPath, imgPath));

        if (fs.existsSync(localImage)) {
          const imageStats = fs.statSync(localImage);

          if (imageStats.isFile()) {
            this.config[key].table.size = pB(imageStats.size);
            return;
          }
        }
      }

      this.config[key].table.size = '[remote]';
    });

    return this;
  }

  /**
   * Converts the `table` key into an array.
   * @returns {Array}
   */
  getTable() {
    // TODO: Function expression.
    return this.configKeys.map(key => Object.values(this.config[key].table));
  }

  /**
   * Writes the final CSV file.
   * @param {String} filename File name path.
   */
  write(filename) {
    const filePath = path.join(this.tagsPath, filename);
    const content = this.getTable().join('\n');

    if (!fs.existsSync(this.tagsPath)) {
      fs.mkdirSync(this.tagsPath);
    }

    fs.writeFileSync(filePath, content);

    log.success(`File saved: ${filePath}`);
  }
}

module.exports = Csv;

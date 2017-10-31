const fs = require('fs');
const path = require('path');

const $ = require('../scripts/helpers');

const LINKS = {
  replace(data) {
    var hrefs = [];

    data.replace(/(<a [^>]*href="([^"]+))/g, (tag, substr, href) => {
      hrefs.push(href);
    });

    return hrefs;
  },

  getUtmVars(query) {
    var parameters = query.split('&');
    var utmValues = [];

    parameters.forEach(parameter => {
      utmValues.push(parameter.substring(parameter.indexOf('=') + 1));
    });

    return utmValues;
  },

  format(links) {
    var linksValues = Object.keys(links).map(link => {
      const utmPosition = link.indexOf('?utm_');

      if (utmPosition > 0) {
        const utmVars = LINKS.getUtmVars(link.substring(utmPosition));
        return [links[link], link.substring(0, utmPosition), ...utmVars];
      }

      return [links[link], link];
    });

    return linksValues;
  }
};

const IMAGES = {
  getImageTags(data) {
    var imageTags = [];

    data.replace(/(<img.*?>)/g, imageTag => {
      imageTags.push(imageTag);
    });

    return imageTags;
  },

  getAttr(imageTags, attr) {
    var values = [];
    var regex = new RegExp(`${attr}="([^"]+)`);

    imageTags.forEach(imageTag => {
      if (imageTag.indexOf(attr) >= 0) {
        imageTag.replace(regex, (match, value) => {
          values.push(value);
        });
      } else {
        values.push('');
      }
    });

    return values;
  },

  getSize(image) {
    if (fs.existsSync(image)) {
      const imageStats = fs.statSync(image);

      if (imageStats.isFile()) {
        return imageStats.size / 1000.0;
      }
    }

    return null;
  },

  format(images, liveImgPath) {
    var imagesValues = Object.keys(images).map(image => {
      const imgPath = image;
      let imgSize = '[remote]';

      if (imgPath.includes(liveImgPath)) {
        const imgLocalPath = `dist/img${imgPath.substr(liveImgPath.length)}`;
        imgSize = IMAGES.getSize(imgLocalPath);
      }

      return [images[image].count, image, images[image].alt, imgSize];
    });

    return imagesValues;
  }
};

const HELPERS = {
  writeCSV(filename, vals) {
    var dirname = 'tags/';
    var filePath = dirname + filename;
    var values = vals.join('\n');

    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname);
    }

    fs.writeFileSync(filePath, ''); // RESETS FILE
    fs.writeFileSync(filePath, values, 'utf8');

    $.log.success(`File saved: ${filename}`);
  },

  combineArrays(arr1, arr2) {
    return arr1.map((val1, idx) => [val1, arr2[idx]]);
  },

  removeDuplicates(items) {
    var itemsCleaned = {};

    items.forEach(item => {
      if (typeof item === 'object') {
        if (itemsCleaned[item[0]]) {
          itemsCleaned[item[0]].count += 1;
        } else {
          itemsCleaned[item[0]] = {
            alt: item[1],
            count: 1
          };
        }
      } else {
        itemsCleaned[item] = itemsCleaned[item] ? itemsCleaned[item] + 1 : (itemsCleaned[item] = 1);
      }
    });

    return itemsCleaned;
  }
};

module.exports = grunt => {
  grunt.registerMultiTask('spreadsheet', 'Get images and links attributes from HTML documents.', function spreadsheet() {
    const done = this.async();
    const { liveImgPath } = this.data.options;

    this.filesSrc.forEach(file => {
      const filename = path.basename(file).replace('.html', '.csv');
      const data = fs.readFileSync(file, 'utf8');

      // Find links and their hrefs
      let hrefs = LINKS.replace(data);
      hrefs = HELPERS.removeDuplicates(hrefs);
      hrefs = LINKS.format(hrefs);

      // Find images and their src and alts
      const imageTags = IMAGES.getImageTags(data);
      const imageSrcs = IMAGES.getAttr(imageTags, 'src');
      const imageAlts = IMAGES.getAttr(imageTags, 'alt');

      let imageAttr = HELPERS.combineArrays(imageSrcs, imageAlts);
      imageAttr = HELPERS.removeDuplicates(imageAttr);
      imageAttr = IMAGES.format(imageAttr, liveImgPath);

      // Write files
      HELPERS.writeCSV(`links-${filename}`, hrefs);
      HELPERS.writeCSV(`images-${filename}`, imageAttr);
    });

    done();
  });

  return {
    csv: {
      src: 'dist/*.html',
      options: {
        liveImgPath: '<%= paths.liveImg %>'
      }
    }
  };
};

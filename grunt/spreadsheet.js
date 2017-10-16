var fs = require('fs');
var path = require('path');

var LINKS = {
  replace(data) {
    var hrefs = [];

    data.replace(/(<a [^>]*href="([^"]+))/g, (tag, substr, href) => {
      hrefs.push(href);
    });

    return hrefs;
  },

  getUtmVars: function getUtmVars(query) {
    var parameters = query.split('&');
    var utm_values = [];

    parameters.forEach(parameter => {
      utm_values.push(parameter.substring(parameter.indexOf('=') + 1));
    });

    return utm_values;
  },

  format: function format(links) {
    var links_values = [];

    for (var link in links) {
      var utm_position = link.indexOf('?utm_');
      var link_val = [links[link], link];

      if (utm_position > 0) {
        var utm_vars = LINKS.getUtmVars(link.substring(utm_position));
        link_val = [links[link], link.substring(0, utm_position), ...utm_vars];
      }

      links_values.push(link_val);
    }

    return links_values;
  }
};

var IMAGES = {
  getImageTags(data) {
    var image_tags = [];

    data.replace(/(<img.*?>)/g, image_tag => {
      image_tags.push(image_tag);
    });

    return image_tags;
  },

  getAttr(image_tags, attr) {
    var values = [];
    var regex = new RegExp(`${attr}="([^"]+)`);

    image_tags.forEach(image_tag => {
      if (image_tag.indexOf(attr) >= 0) {
        image_tag.replace(regex, (match, value) => {
          values.push(value);
        });
      } else {
        values.push('');
      }
    });

    return values;
  },

  getSize: function getSize(image) {
    if (fs.existsSync(image)) {
      var image_stats = fs.statSync(image);

      if (image_stats.isFile()) {
        return image_stats.size / 1000.0;
      }
    }

    return null;
  },

  format: function format(images, live_img_path) {
    var images_values = [];

    for (var image in images) {
      var img_path = image;
      var img_size = '[remote]';

      if (img_path.includes(live_img_path)) {
        var img_local_path = `dist/img${img_path.substr(live_img_path.length)}`;
        img_size = IMAGES.getSize(img_local_path);
      }

      images_values.push([images[image].count, image, images[image].alt, img_size]);
    }

    return images_values;
  }
};

var HELPERS = {
  writeCSV: function writeCSV(filename, values) {
    var dirname = 'tags/';
    var file_path = dirname + filename;
    var values = values.join('\n');

    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname);
    }

    fs.writeFileSync(file_path, ''); // RESETS FILE
    fs.writeFileSync(file_path, values, 'utf8');

    grunt.log.oklns('File saved: ', filename);
  },

  combineArrays(arr1, arr2) {
    var result = [];

    for (var i = 0; i < arr1.length; i++) {
      result.push([arr1[i], arr2[i]]);
    }

    return result;
  },

  removeDuplicates: function removeDuplicates(items) {
    var items_cleaned = {};

    items.forEach(item => {
      if (typeof item === 'object') {
        if (items_cleaned[item[0]]) {
          items_cleaned[item[0]].count++;
        } else {
          items_cleaned[item[0]] = {
            alt: item[1],
            count: 1
          };
        }
      } else {
        items_cleaned[item] = items_cleaned[item] ? items_cleaned[item] + 1 : (items_cleaned[item] = 1);
      }
    });

    return items_cleaned;
  }
};

grunt.registerMultiTask('spreadsheet', 'Get images and links attributes from HTML documents.', function spreadsheet() {
  var done = this.async();
  var live_img_path = this.data.options.live_img_path;

  this.filesSrc.forEach(file => {
    var filename = path.basename(file).replace('.html', '.csv');

    var data = fs.readFileSync(file, 'utf8');

    // Find links and their hrefs
    var hrefs = LINKS.replace(data);
    hrefs = HELPERS.removeDuplicates(hrefs);
    hrefs = LINKS.format(hrefs);

    // Find images and their src and alts
    var image_tags = IMAGES.getImageTags(data);
    var image_srcs = IMAGES.getAttr(image_tags, 'src');
    var image_alts = IMAGES.getAttr(image_tags, 'alt');
    var image_attr = HELPERS.combineArrays(image_srcs, image_alts);

    image_attr = HELPERS.removeDuplicates(image_attr);
    image_attr = IMAGES.format(image_attr, live_img_path);

    // Write files
    HELPERS.writeCSV(`links-${filename}`, hrefs);
    HELPERS.writeCSV(`images-${filename}`, image_attr);
  });

  done();
});

module.exports = {
  all: {
    src: 'dist/*.html',
    options: { live_img_path: '<%= paths.live_img %>' }
  }
};

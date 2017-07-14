'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function(grunt) {
    var LINKS = {
        replace: function(data) {
            var hrefs = [];

            data.replace(/(<a [^>]*href="([^"]+))/g, function(tag, substr, href) {
                hrefs.push(href);
            });

            return hrefs;
        },

        getUtmVars: function getUtmVars(query) {
            var parameters = query.split('&');
            var utm_values = [];

            parameters.forEach(function(parameter) {
                utm_values.push(parameter.substring(parameter.indexOf('=') + 1));
            });

            return utm_values;
        },

        format: function format(links) {
            var links_values = [];

            for (var link in links) {
                link = (links[link] > 1) ? `${ link } (${ links[link] })` : link;

                var utm_position = link.indexOf('?utm_');
                var link_val = link;

                if (utm_position > 0) {
                    var utm_vars = LINKS.getUtmVars(link.substring(utm_position));
                    link_val = [link.substring(0, utm_position), ...utm_vars];
                }

                links_values.push(link_val);
            }

            return links_values;
        }
    };

    var IMAGES = {
        replace: function(data) {
            var attr_values = [];

            data.replace(/(<img src="([^"]+).*?alt="([^"]+))/g, function(tag, substr, src, alt) {
                attr_values.push([src, alt.replace(',', '","')]);
            });

            return attr_values;
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

            images.forEach(function(image) {
                var img_path = image[0];
                var img_size = '[remote]';

                if (img_path.includes(live_img_path)) {
                    var img_local_path = `dist/img${ img_path.substr(live_img_path.length) }`;
                    img_size = IMAGES.getSize(img_local_path);
                }

                images_values.push([...image, img_size]);
            });

            return images_values;
        }
    };

    var HELPERS = {
        writeCSV: function writeCSV(filename, values, done) {
            var dirname = 'tags/';
            var file_path = dirname + filename;
            var values = values.join('\n');

            if (!fs.existsSync(dirname)) {
                fs.mkdirSync(dirname);
            }

            fs.writeFileSync(file_path, ''); // RESETS FILE
            
            fs.writeFile(file_path, values, 'utf8', function(err) {
                if (err) done;

                grunt.log.oklns('File saved: ', filename);
                done();
            });
        },
        removeDuplicates: function removeDuplicates(items) {
            var items_cleaned = {};

            items.forEach(function(item) {
                items_cleaned[item] = (items_cleaned[item]) ? items_cleaned[item] + 1 : items_cleaned[item] = 1;
            });

            return items_cleaned;
        }
    };

    grunt.registerMultiTask('spreadsheet', 'Get images and links attributes from HTML documents.', function spreadsheet() {
        var done = this.async();
        var live_img_path = this.data.options.live_img_path;

        this.filesSrc.forEach(function(file) {
            var filename = path.basename(file).replace('.html', '.csv');

            fs.readFile(file, 'utf8', function(err, data) {
                if (err) done;

                var hrefs = LINKS.replace(data);
                var img_attr = IMAGES.replace(data);

                hrefs = HELPERS.removeDuplicates(hrefs);
                hrefs = LINKS.format(hrefs);
                
                img_attr = IMAGES.format(img_attr, live_img_path);

                HELPERS.writeCSV(`links-${ filename }`, hrefs, done);
                HELPERS.writeCSV(`images-${ filename }`, img_attr, done);
            });
        });
    });

    return {
        all: {
            src: 'dist/*.html',
            options: { live_img_path: '<%= paths.live_img %>' }
        }
    };
};

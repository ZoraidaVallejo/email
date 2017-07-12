'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function(grunt) {
    var LINKS = {
        replacer: function(data) {
            var hrefs = [];
            
            data.replace(/(<a href="([^"]+))/g, function(tag, substr, href) {
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
        
        formatLinks: function formatLinks(links) {
            var links_vars = [];

            links.forEach(function(link) {
                var utm_position = link.indexOf('?utm_');

                if (utm_position > 0) {
                    var utm_vars = LINKS.getUtmVars(link.substring(utm_position));
                    links_vars.push([link.substring(0, utm_position), ...utm_vars]);
                } else {
                    links_vars.push([link]);
                }

            });

            return links_vars;
        }
    };

    var IMAGES = {
        replacer: function(data) {
            var attr_values = [];
            
            data.replace(/(<img src="([^"]+).*?alt="([^"]+))/g, function(tag, substr, src, alt) {
                attr_values.push([src, alt.replace(',', '","')]);
            });

            return attr_values;
        }
    };

    var writeCSV = function writeCSV(filename, values, done) {
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
    };

    grunt.registerMultiTask('spreadsheet', 'Get src and href values from HTML documents.', function spreadsheet() {
        var done = this.async();

        this.files[0].src.forEach(function(file) {
            var filename = path.basename(file).replace('.html', '.csv');

            fs.readFile(file, 'utf8', function(err, data) {
                if (err) done;

                var hrefs = LINKS.replacer(data);
                var img_attr = IMAGES.replacer(data);

                hrefs = LINKS.formatLinks(hrefs, done);

                writeCSV('links-' + filename, hrefs, done);
                writeCSV('images-' + filename, img_attr, done);
            });
        });
    });

    return {
        src: 'dist/*.html'
    };
};

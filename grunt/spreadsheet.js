'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function(grunt) {
    var getValue = function getValue(data, regex) {
        var values = [];

        data.replace(regex, function(tag, substr, value) {
            values.push(value);
        });

        return values;
    };

    var getUtmVars = function getUtmVars(query) {
        var parameters = query.split('&');
        var utm_values = [];

        parameters.forEach(function(parameter) {
            utm_values.push(parameter.substring(parameter.indexOf('=') + 1));
        });

        return utm_values;
    };

    var handleLinks = function handleLinks(links) {
        var links_vars = [];

        links.forEach(function(link) {
            var utm_position = link.indexOf('?utm_');

            if (utm_position > 0) {
                var utm_vars = getUtmVars(link.substring(utm_position));
                links_vars.push([link.substring(0, utm_position), ...utm_vars]);
            } else {
                links_vars.push([link]);
            }

        });

        return links_vars;
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
        var anchor_regex = /(<a href="([^"]+))/g,
            img_regex = /(<img src="([^"]+))/g;

        this.files[0].src.forEach(function(file) {
            var filename = path.basename(file).replace('.html', '.csv');

            fs.readFile(file, 'utf8', function(err, data) {
                if (err) done;

                var hrefs = getValue(data, anchor_regex);
                var srcs = getValue(data, img_regex);

                hrefs = handleLinks(hrefs, done);

                writeCSV('links-' + filename, hrefs, done);
                writeCSV('images-' + filename, srcs, done);
            });
        });
    });

    return {
        src: 'dist/*.html'
    };
};

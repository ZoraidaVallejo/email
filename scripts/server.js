'use strict';

const cwd = process.cwd();

const express = require('express');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');

var app = express();

// Use embedded javascript for the view engine (templates)
app.set('view engine', 'ejs');

// Allow relative image links from either ./dist/img or ./src/img
app.use('/src/img', express.static(path.join(cwd, '/src/img')));
app.use('/dist/img', express.static(path.join(cwd, '/dist/img')));

// Set the route handler for the preview page.
app.get('/', function(req, res) {
  res.status(200);

  var data = { templates: getTemplates() };

  res.render(path.join(cwd, '/preview/index'), data);
});

module.exports = app;

/**
 * Helper function to get templates and their 'subject' from <title> tag
 * @return {array} List of templates
 */
function getTemplates() {
  var templates = [],
    templateDir = path.join(cwd, '/dist/'),
    templateFiles = fs.readdirSync(templateDir);

  templateFiles.forEach(function(file) {

    if (file.substr(-5) === '.html') {
      var contents = fs.readFileSync(templateDir + file, 'utf8');

      if (contents) {
        var $ = cheerio.load(contents);

        templates.push({
          filename: file,
          subject: $('html title').text() || 'Subject not available'
        });
      }
    }
  });

  return templates;
}

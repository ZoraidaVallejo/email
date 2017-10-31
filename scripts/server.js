const cwd = process.cwd();

const express = require('express');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');

var app = express();

/**
 * Helper function to get templates and their 'subject' from <title> tag
 * @return {array} List of templates
 */
function getTemplates() {
  var templates = [];
  var templateDir = path.join(cwd, '/dist/');
  var templateFiles = fs.readdirSync(templateDir);

  templateFiles.forEach(file => {
    if (file.substr(-5) === '.html') {
      const contents = fs.readFileSync(templateDir + file, 'utf8');

      if (contents) {
        const $ = cheerio.load(contents);

        templates.push({
          filename: file,
          subject: $('html title').text() || 'Subject not available'
        });
      }
    }
  });

  return templates;
}

// Use embedded javascript for the view engine (templates)
app.set('view engine', 'ejs');

// Allow relative image links from either ./dist/img or ./src/img
app.use('/src/img', express.static(path.join(cwd, '/src/img')));
app.use('/dist/img', express.static(path.join(cwd, '/dist/img')));

// Set the route handler for the preview page.
app.get('/', (req, res) => {
  res.status(200);

  const data = { templates: getTemplates() };

  res.render(path.join(cwd, '/preview/index'), data);
});

module.exports = app;

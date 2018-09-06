const path = require('path');

const cwd = process.cwd();

module.exports = {
  options: {
    layouts: [path.join(cwd, '/common/layouts/*.hbs'), '<%= paths.src %>/layouts/*.hbs'],
    partials: [
      path.join(cwd, '/common/partials/*.hbs'),
      path.join(cwd, '/common/ui-components/*.hbs'),
      '<%= paths.src %>/partials/**/*.hbs'
    ],
    plugins: 'grunt-assemble-contextual',
    contextual: {
      dest: './temp/'
    },
    helpers: ['./lib/handlebars-helpers.js', './node_modules/handlebars-helpers/lib/**/*.js'],
    data: ['<%= paths.src %>/data/*.{json,yml}', 'custom-config.json'],
    flatten: true
  },
  pages: {
    src: ['<%= paths.src %>/emails/*.hbs'],
    dest: '<%= paths.dist %>/'
  }
};

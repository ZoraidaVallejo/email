module.exports = {
  options: {
    layouts: ['common/layouts/*.hbs', '<%= paths.src %>/layouts/*.hbs'],
    partials: ['common/partials/**/*.hbs', '<%= paths.src %>/partials/**/*.hbs'],
    plugins: 'grunt-assemble-contextual',
    contextual: {
      dest: './temp/'
    },
    helpers: ['./lib/handlebars-helpers.js', './node_modules/handlebars-helpers/lib/**/*.js'],
    data: ['common/data/*.json', '<%= paths.src %>/data/*.json', 'custom-config.json'],
    flatten: true
  },
  pages: {
    src: ['<%= paths.src %>/emails/*.hbs'],
    dest: '<%= paths.dist %>/'
  }
};

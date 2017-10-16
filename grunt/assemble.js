module.exports = {
  options: {
    layoutdir: '<%= paths.src %>/layouts',
    partials: ['<%= paths.src %>/partials/**/*.hbs'],
    plugins: 'grunt-assemble-contextual',
    contextual: {
      dest: './temp/'
    },
    helpers: ['<%= paths.src %>/helpers/custom-helpers.js', './node_modules/handlebars-helpers/**/*.js'],
    data: ['<%= paths.src %>/data/*.{json,yml}', 'custom-config.json'],
    flatten: true
  },
  pages: {
    src: ['<%= paths.src %>/emails/*.hbs'],
    dest: '<%= paths.dist %>/'
  }
};

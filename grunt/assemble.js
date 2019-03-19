module.exports = {
  options: {
    layouts: ['common/layouts/*.hbs', '<%= relativeFolders.src %>/layouts/*.hbs'],
    partials: ['common/partials/**/*.hbs', '<%= relativeFolders.src %>/partials/**/*.hbs'],
    plugins: 'grunt-assemble-contextual',
    contextual: {
      dest: './temp/'
    },
    helpers: ['./lib/handlebars-helpers.js', './node_modules/handlebars-helpers/lib/**/*.js'],
    data: ['common/data/*.json', '<%= relativeFolders.src %>/data/**/*.json'],
    flatten: true
  },
  pages: {
    src: ['<%= relativeFolders.src %>/emails/*.hbs'],
    dest: '<%= relativeFolders.dist %>/'
  }
};

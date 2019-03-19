module.exports = {
  emails: {
    files: [
      'common/**/*',
      '<%= relativeFolders.src %>/emails/*',
      '<%= relativeFolders.src %>/layouts/*',
      '<%= relativeFolders.src %>/data/**/*',
      '<%= relativeFolders.src %>/scss/**/*',
      '<%= relativeFolders.src %>/partials/**/*'
    ],
    tasks: ['devel']
  },

  dist: {
    files: ['<%= relativeFolders.dist %>/*'],
    tasks: [],
    options: {
      livereload: true
    }
  }
};

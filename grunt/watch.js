module.exports = {
  emails: {
    files: [
      'common/**/*',
      '<%= paths.src %>/emails/*',
      '<%= paths.src %>/layouts/*',
      '<%= paths.src %>/data/**/*',
      '<%= paths.src %>/scss/**/*',
      '<%= paths.src %>/partials/**/*'
    ],
    tasks: ['devel']
  },

  dist: {
    files: ['./dist/*'],
    tasks: [],
    options: {
      livereload: true
    }
  }
};

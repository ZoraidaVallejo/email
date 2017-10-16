// Watches for changes to CSS or email templates then runs grunt tasks
module.exports = (grunt, options) => ({
  emails: {
    files: [
      '<%= paths.src %>/emails/*',
      '<%= paths.src %>/layouts/*',
      '<%= paths.src %>/data/*',
      '<%= paths.src %>/css/scss/**/*',
      '<%= paths.src %>/partials/**/*'
    ],
    tasks: [options.conversionType, 'stylelint']
  },

  preview_dist: {
    files: ['./dist/*'],
    tasks: [],
    options: {
      livereload: true
    }
  },

  preview: {
    files: ['<%= paths.preview %>/scss/**/*'],
    tasks: ['sass:preview', 'autoprefixer:preview'],
    options: {
      livereload: true
    }
  }
});

module.exports = (grunt, { version, conversionType, paths }) => ({
  emails: {
    files: [
      `common/**/*`,
      `${paths.src}/emails/*`,
      `${paths.src}/layouts/*`,
      `${paths.src}/data/*`,
      `${paths.src}${!version ? '/css' : ''}/scss/**/*`,
      `${paths.src}/partials/**/*`
    ],
    tasks: !version ? conversionType : [conversionType, 'stylelint']
  },

  dist: {
    files: ['./dist/*'],
    tasks: [],
    options: {
      livereload: true
    }
  }
});

module.exports = (grunt, {version, conversionType, paths }) => ({
  emails: {
    files: [
      `${paths.src}/emails/*`,
      `${paths.src}/layouts/*`,
      `${paths.src}/data/*`,
      `${paths.src}${!version ? '/css' : ''}/scss/**/*`,
      `${paths.src}/partials/**/*`
    ],
    tasks: [conversionType, 'stylelint']
  },

  dist: {
    files: ['./dist/*'],
    tasks: [],
    options: {
      livereload: true
    }
  },

  preview: {
    files: [`${paths.preview}/scss/**/*`],
    tasks: ['sass:preview', 'postcss:preview'],
    options: {
      livereload: true
    }
  }
});

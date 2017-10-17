module.exports = {
  prod: {
    options: {
      removeComments: true,
      collapseWhitespace: true,
      removeEmptyAttributes: attrName => attrName === 'style'
    },
    files: [
      {
        expand: true,
        flatten: true,
        src: '<%= paths.dist %>/*.html',
        dest: '<%= paths.dist %>'
      }
    ]
  }
};

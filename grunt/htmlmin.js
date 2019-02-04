module.exports = {
  prod: {
    options: {
      removeComments: true,
      collapseWhitespace: true,
      // TODO: Check if class needs to be removed if empty.
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

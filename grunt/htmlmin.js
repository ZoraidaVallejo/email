module.exports = {
  live: {
    options: {
      removeComments: true,
      collapseWhitespace: true,
      removeEmptyAttributes(attrName) {
        return attrName === 'style';
      }
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

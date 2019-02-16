module.exports = {
  dist: {
    options: {
      removeComments: true,
      collapseWhitespace: true,
      removeEmptyAttributes: attrName => attrName === 'style',
      minifyCSS: {
        compatibility: {
          properties: {
            zeroUnits: false
          }
        },
        level: {
          1: {
            removeQuotes: false,
            optimizeOutline: false
          }
        }
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

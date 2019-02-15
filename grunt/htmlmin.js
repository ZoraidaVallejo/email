const files = [
  {
    expand: true,
    flatten: true,
    src: '<%= paths.dist %>/*.html',
    dest: '<%= paths.dist %>'
  }
];

module.exports = {
  compressed: {
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
    files
  },
  dist: {
    options: {
      removeComments: true,
      collapseWhitespace: true,
      removeEmptyAttributes: attrName => attrName === 'style'
    },
    files
  }
};

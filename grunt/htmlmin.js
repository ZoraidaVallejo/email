module.exports = {
  dist: {
    options: {
      removeComments: true,
      collapseWhitespace: true,
      removeEmptyAttributes(attrName) {
        return attrName == 'style' || attrName == 'responsive';
      },
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
        src: '<%= relativeFolders.dist %>/*.html',
        dest: '<%= relativeFolders.dist %>'
      }
    ]
  }
};

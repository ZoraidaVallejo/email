module.exports = {
  options: {
    parser: 'html',
    printWidth: 500,
    progress: false
  },
  files: {
    src: ['<%= paths.dist %>/*.html']
  }
};

module.exports = {
  options: {
    parser: 'html',
    printWidth: 5000,
    progress: false
  },
  files: {
    src: ['<%= paths.dist %>/*.html']
  }
};

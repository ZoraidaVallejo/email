module.exports = {
  options: {
    parser: 'html',
    printWidth: 500,
    progress: false // By default, a progress bar is not shown. You can opt into this behavior by passing true.
  },
  files: {
    // Target-specific file lists and/or options go here.
    src: ['<%= paths.dist %>/*.html']
  }
};

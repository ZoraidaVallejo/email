module.exports = {
  target: {
    options: {
      port: '<%= port %>',
      hostname: '*',
      bases: ['<%= relativeFolders.dist %>', '<%= previewUI %>', '<%= relativeFolders.src %>'],
      server: './lib/server.js',
      livereload: true
    }
  }
};

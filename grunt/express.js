module.exports = {
  target: {
    options: {
      port: '<%= port %>',
      hostname: '*',
      bases: ['<%= paths.dist %>', '<%= previewUI %>', '<%= paths.src %>'],
      server: './lib/server.js',
      livereload: true
    }
  }
};

module.exports = {
  target: {
    options: {
      port: '<%= port %>',
      hostname: '*',
      bases: ['<%= paths.dist %>', '<%= paths.preview %>', '<%= paths.src %>'],
      server: './scripts/server.js',
      livereload: true
    }
  }
};

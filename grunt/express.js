module.exports = {
  target: {
    options: {
      port: '<%= port %>',
      hostname: '*',
      bases: ['<%= paths.dist %>', '<%= paths.preview %>', '<%= paths.src %>'],
      server: './lib/server.js',
      livereload: true
    }
  }
};

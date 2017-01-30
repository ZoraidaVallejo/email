'use strict';

// Browser-based preview task
module.exports = {

    server: {
        options: {
            port: '<%= port %>',
            bases: ['<%= paths.dist %>', '<%= paths.preview %>', '<%= paths.src %>'],
            server: './server.js',
            livereload: true
        }
    }
};

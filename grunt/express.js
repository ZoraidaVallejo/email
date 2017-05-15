'use strict';

// Browser-based preview task
module.exports = {

    server: {
        options: {
            port: '<%= port %>',
            hostname: '*',
            bases: ['<%= paths.dist %>', '<%= paths.preview %>', '<%= paths.src %>'],
            server: './scripts/server.js',
            livereload: true
        }
    }
};

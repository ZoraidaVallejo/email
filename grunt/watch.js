'use strict';

// Watches for changes to CSS or email templates then runs grunt tasks
module.exports = {
    blast: {
        files: [
            '<%= paths.src %>/emails/*',
            '<%= paths.src %>/layouts/*',
            '<%= paths.src %>/data/*'
        ],
        tasks: ['blast']
    },
    preview_dist: {
        files: ['./dist/*'],
        tasks: [],
        options: {
            livereload: true
        }
    },
    preview: {
        files: ['<%= paths.preview %>/scss/**/*'],
        tasks: ['sass:preview', 'autoprefixer:preview'],
        options: {
            livereload: true
        }
    }
};

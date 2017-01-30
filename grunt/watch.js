'use strict';

// Watches for changes to CSS or email templates then runs grunt tasks
module.exports = function(grunt, options) {

    return {

        emails: {
            files: [
                '<%= paths.src %>/emails/*',
                '<%= paths.src %>/layouts/*',
                '<%= paths.src %>/data/*',
                '<%= paths.src %>/css/scss/**/*',
                '<%= paths.src %>/partials/**/*'
            ],
            tasks: [options.conversionType]
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
};

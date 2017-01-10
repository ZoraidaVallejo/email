'use strict';

// Watches for changes to CSS or email templates then runs grunt tasks
module.exports = function(grunt, options) {

    // BLAST configuration
    let filesToWatch = [
        '<%= paths.src %>/emails/*',
        '<%= paths.src %>/layouts/*',
        '<%= paths.src %>/data/*'
    ];

    // Newsletter configuration overwrite
    if(options.conversionType === 'newsletter') {
        filesToWatch = filesToWatch.concat([
            '<%= paths.src %>/css/scss/**/*',
            '<%= paths.src %>/partials/**/*'
        ]);
    }

    return {
        emails: {
            files: filesToWatch,
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

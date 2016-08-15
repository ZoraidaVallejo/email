module.exports = function(grunt) {

    require('load-grunt-config')(grunt, {

        // Pass data to tasks
        data: {
            port: 4000,
            justaticVersion: '20160803a',

            // Re-usable filesystem path variables
            paths: {
                src:        'src',
                src_img:    'src/img',
                dist:       'dist',
                dist_img:   'dist/img',
                preview:    'preview',
                live_img:   'https://justatic.com/v/<%= justaticVersion %>/emails/images/newsletters'
            },

            currentYear: '2016',
            currentMonth: '08',
            watchFile: 'newsletter-<%= currentYear %>-<%= currentMonth %>',

            // secrets.json is ignored in git because it contains sensitive data
            // See the README for configuration settings
            secrets: grunt.file.readJSON('secrets.json')
        }
    });
};
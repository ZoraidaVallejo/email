module.exports = function(grunt) {

    require('load-grunt-config')(grunt, {

        // Pass data to tasks
        data: {
            port: 4000,
            justatic_version: '20160819a',
            current_year: '2016',
            current_month: '08',

            // Re-usable filesystem path variables
            paths: {
                src: 'src',
                src_img: 'src/img',
                dist: 'dist',
                dist_img: 'dist/img',
                preview: 'preview',
                live_img: 'https://justatic.com/v/<%= justatic_version %>/emails/images/lawyer-directory/welcome-series',
                remote_img_path: '/mnt/files/emails/images/lawyer-directory/welcome-series'
            },

            file_to_send: 'welcome-01.html',
            compressed_file_name: 'welcome-series',

            // secrets.json is ignored in git because it contains sensitive data
            // See the README for configuration settings
            secrets: grunt.file.readJSON('secrets.json')
        }
    });
};  
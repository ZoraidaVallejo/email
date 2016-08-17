module.exports = function(grunt) {

    require('load-grunt-config')(grunt, {

        // Pass data to tasks
        data: {
            port: 4000,
            justaticVersion: '20160815a',
            currentYear: '2016',
            currentMonth: '08',

            // Re-usable filesystem path variables
            paths: {
                src: 'src',
                src_img: 'src/img',
                dist: 'dist',
                dist_img: 'dist/img',
                preview: 'preview',
                // live_img: 'https://justatic.com/v/<%= justaticVersion %>/emails/images/newsletters/<%= currentYear %>/<%= currentMonth %>',
                live_img: 'https://justatic.com/v/<%= justaticVersion %>/emails/images/lawyer-directory/welcome-series',
                // remoteImagePath: '/mnt/files/emails/images/newsletters/<%= currentYear %>/<%= currentMonth %>'
                remoteImagePath: '/mnt/files/emails/images/lawyer-directory/welcome-series'
            },

            // compressName: 'newsletter-<%= currentYear %>-<%= currentMonth %>',
            fileToSend: 'welcome-01.html',
            compressName: 'welcome-series',

            // secrets.json is ignored in git because it contains sensitive data
            // See the README for configuration settings
            secrets: grunt.file.readJSON('secrets.json')
        }
    });
};  
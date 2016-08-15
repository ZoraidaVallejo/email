'use strict';

module.exports = {
    dist: {
        auth: {
            host: 'internal.justiapro.com',
            authKey: 'key1'
        },
        src: '<%= paths.dist_img %>',
        dest: '<%= paths.remoteImagePath %>/<%= currentYear %>/<%= currentMonth %>',
        exclusions: [
            '<%= paths.dist_img %>/**/.DS_Store',
            '<%= paths.dist_img %>/**/Thumbs.db',
            '<%= paths.dist_img %>/**/.desktop.ini',
            '<%= paths.dist_img %>/**/*.sublime-*',
            '<%= paths.dist_img %>/**/.sftp-*.*'
        ],
        progress: true
    }
};

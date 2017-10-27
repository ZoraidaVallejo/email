'use strict';

module.exports = {

    images: {
        auth: {
            host: 'justatic.justiapro.com',
            authKey: 'key1'
        },
        src: '<%= paths.dist_img %>',
        dest: '<%= paths.remote_img_path %>',
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

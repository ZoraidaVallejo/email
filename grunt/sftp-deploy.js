module.exports = {
    images: {
        auth: {
            host: '192.168.88.191',
            authKey: 'key1'
        },
        src: '<%= relativeFolders.distImg %>',
        dest: '<%= remoteImgPath %>',
        exclusions: [
            '<%= relativeFolders.distImg %>/**/.DS_Store',
            '<%= relativeFolders.distImg %>/**/Thumbs.db',
            '<%= relativeFolders.distImg %>/**/.desktop.ini',
            '<%= relativeFolders.distImg %>/**/*.sublime-*',
            '<%= relativeFolders.distImg %>/**/.sftp-*.*'
        ],
        progress: true
    }
};

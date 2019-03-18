module.exports = {
  images: {
    auth: {
      host: 'justatic.justiapro.com',
      authKey: 'key1'
    },
    src: '<%= paths.distImg %>',
    dest: '<%= remoteImgPath %>',
    exclusions: [
      '<%= paths.distImg %>/**/.DS_Store',
      '<%= paths.distImg %>/**/Thumbs.db',
      '<%= paths.distImg %>/**/.desktop.ini',
      '<%= paths.distImg %>/**/*.sublime-*',
      '<%= paths.distImg %>/**/.sftp-*.*'
    ],
    progress: true
  }
};

module.exports = {
  images: {
    auth: {
      host: 'justatic.justiapro.com',
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

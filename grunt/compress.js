module.exports = {
  target: {
    options: {
      archive: '<%= compressedFileName %>.zip'
    },
    files: [
      {
        expand: true,
        cwd: '<%= relativeFolders.dist %>/',
        src: ['*.html'],
        dest: '<%= relativeFolders.dist %>/'
      },
      {
        expand: true,
        cwd: '<%= relativeFolders.src %>/',
        src: ['**/*'],
        dest: '<%= relativeFolders.src %>/'
      }
    ]
  }
};

module.exports = {
  target: {
    options: {
      archive: '<%= compressedFileName %>.zip'
    },
    files: [
      {
        src: ['customConfig.json'],
        dest: '/',
        filter: 'isFile'
      },
      {
        expand: true,
        cwd: '<%= paths.dist %>/',
        src: ['*.html'],
        dest: '<%= paths.dist %>/'
      },
      {
        expand: true,
        cwd: '<%= paths.src %>/',
        src: ['**/*'],
        dest: '<%= paths.src %>/'
      }
    ]
  }
};

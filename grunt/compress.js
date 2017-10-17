module.exports = {
  target: {
    options: {
      archive: '<%= compressed_file_name %>.zip'
    },
    files: [
      {
        src: ['custom-config.*'],
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

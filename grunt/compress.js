module.exports = function grtunCompress(grunt, { compressedFileName }) {
  var zipName = compressedFileName !== '' ? compressedFileName : '<%= projectName %>-<%= dateFormat.dash %>.zip';

  return {
    target: {
      options: {
        archive: zipName
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
};

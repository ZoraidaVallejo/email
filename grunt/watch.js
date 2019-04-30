module.exports = {
  emails: {
    files: [
      'common/**/*',
      '<%= relativeFolders.src %>/emails/*',
      '<%= relativeFolders.src %>/data/**/*',
      '<%= relativeFolders.src %>/scss/**/*',
      '<%= relativeFolders.src %>/partials/**/*'
    ],
    tasks: ['devel']
  }
};

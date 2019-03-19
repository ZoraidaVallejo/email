module.exports = {
  public: {
    expand: true,
    cwd: '<%= relativeFolders.dist %>/',
    src: ['*.html'],
    dest: 'public/<%= projectName %>/<%= currentYear %>/<%= currentMonth %>/',
    filter: 'isFile'
  }
};

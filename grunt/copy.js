module.exports = {
  public: {
    expand: true,
    cwd: '<%= relativeFolders.dist %>/',
    src: ['*.html'],
    dest: 'public/<%= projectName %>/<%= dateFormat.slash %>/',
    filter: 'isFile'
  }
};

module.exports = {
  public: {
    expand: true,
    cwd: 'dist/',
    src: ['*.html'],
    dest: 'public/<%= projectName %>/<%= currentYear %>/<%= currentMonth %>/',
    filter: 'isFile'
  }
};

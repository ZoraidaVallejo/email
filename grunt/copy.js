module.exports = {
  public: {
    expand: true,
    cwd: 'dist/',
    src: ['*.html'],
    dest: 'public/<%= conversionType %>/<%= currentYear %>/<%= currentMonth %>/',
    filter: 'isFile'
  }
};

module.exports = (grunt, options) => ({
  public: {
    expand: true,
    cwd: 'dist/',
    src: ['*.html'],
    dest: `public/${options.conversionType}/${options.current_year}/${options.current_month}/`,
    filter: 'isFile'
  }
});

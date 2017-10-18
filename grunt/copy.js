/* eslint-disable camelcase */

module.exports = (grunt, { conversionType, current_year, current_month }) => ({
  public: {
    expand: true,
    cwd: 'dist/',
    src: ['*.html'],
    dest: `public/${conversionType}/${current_year}/${current_month}/`,
    filter: 'isFile'
  }
});

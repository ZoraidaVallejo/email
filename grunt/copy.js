/* eslint-disable camelcase */

module.exports = (grunt, { conversionType, currentYear, currentMonth }) => ({
  public: {
    expand: true,
    cwd: 'dist/',
    src: ['*.html'],
    dest: `public/${conversionType}/${currentYear}/${currentMonth}/`,
    filter: 'isFile'
  }
});

const path = require('path');

module.exports = (grunt, { conversionType, currentYear, currentMonth }) => ({
  public: {
    expand: true,
    cwd: 'dist/',
    src: ['*.html'],
    dest: path.join('public', conversionType, currentYear, currentMonth, '/'),
    filter: 'isFile'
  }
});

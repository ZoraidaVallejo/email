const path = require('path');

module.exports = (grunt, { paths }) => ({
  emails: {
    files: [
      'common/**/*',
      path.join(paths.src, 'emails/*'),
      path.join(paths.src, 'layouts/*'),
      path.join(paths.src, 'data/*'),
      path.join(paths.src, 'scss/**/*'),
      path.join(paths.src, 'partials/**/*')
    ],
    tasks: ['devel']
  },

  dist: {
    files: ['./dist/*'],
    tasks: [],
    options: {
      livereload: true
    }
  }
});

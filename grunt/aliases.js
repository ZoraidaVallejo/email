const develTasks = {
  1: ['clean:dist'],
  2: ['assemble', 'juice', 'imagemin', 'replace:importantStyle'],
  3: ['replace:fixResponsive', 'replace:srcImages', 'replace:removeDupStyles']
};

module.exports = {
  default: ['serve'],

  devel: [...develTasks[1], 'sass:devel', ...develTasks[2], 'replace:classesToData', ...develTasks[3], 'prettier'],

  dist: [...develTasks[1], 'sass:dist', ...develTasks[2], 'replace:removeClasses', ...develTasks[3]],

  serve: ['devel', 'buildPreview', 'express', 'open', 'watch'],

  report: ['spreadsheet'],

  upload: ['imagemin', 'sftp-deploy'],

  build: [
    // Base
    'dist',
    'replace:liveImages',
    'spreadsheet',
    // Responsive
    'replace:shortenClasses',
    'htmlmin:compressed',
    'prettier'
  ],

  buildPreview: ['sass:preview', 'postcss:preview'],

  publish: ['build', 'copy', 'compress', 'clean:all'],

  test: ['sass']
};

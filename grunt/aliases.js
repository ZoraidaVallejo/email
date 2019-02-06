module.exports = {
  default: ['serve'],

  devel: [
    // Group 1
    'clean:dist',
    'sass:dist',
    // Group 2
    'assemble',
    'juice',
    'imagemin',
    // Group 3
    'replace:importantStyle',
    'replace:removeClasses',
    'replace:fixResponsive',
    'replace:srcImages',
    // Group 4
    'replace:removeDupStyles'
  ],

  serve: ['devel', 'buildPreview', 'express', 'open', 'watch'],

  report: ['spreadsheet'],

  upload: ['imagemin', 'sftp-deploy'],

  build: [
    // Base
    'devel',
    'replace:liveImages',
    'spreadsheet',
    // Responsive
    'replace:shortenClasses',
    'htmlmin'
  ],

  buildPreview: ['sass:preview', 'postcss:preview'],

  publish: ['build', 'copy', 'compress', 'clean:all'],

  test: ['sass']
};

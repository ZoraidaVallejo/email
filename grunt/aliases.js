const develTasks = {
  1: ['clean:dist'],
  2: ['postcss:source', 'assemble', 'juice', 'imagemin', 'replace:importantStyle'],
  3: ['replace:fixResponsive', 'replace:srcImages', 'replace:removeDupStyles']
};

module.exports = function gruntAliases() {
  const standAloneTasks = {
    // npm start build.preview
    buildPreview: ['sass:preview', 'postcss:preview']
  };

  const conversionTasks = {
    // npm start
    default: ['devel', 'buildPreview', 'express', 'open', 'watch'],

    // npm start build.devel
    devel: [...develTasks[1], 'sass:devel', ...develTasks[2], 'replace:classesToData', ...develTasks[3], 'prettier'],

    dist: [...develTasks[1], 'sass:dist', ...develTasks[2], 'replace:removeClasses', ...develTasks[3]],

    // npm start report
    report: ['spreadsheet'],

    // npm start upload
    upload: ['imagemin', 'sftp-deploy'],

    // npm start build
    build: ['dist', 'replace:liveImages', 'spreadsheet', 'htmlmin', 'purge', 'prettier'],

    // npm start publish
    publish: ['build', 'copy', 'compress', 'clean:all']
  };

  if (process.env.CONVERSION_CONFIG == 'true') {
    return Object.assign({}, conversionTasks, standAloneTasks);
  }

  return standAloneTasks;
};

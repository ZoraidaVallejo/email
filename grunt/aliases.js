module.exports = (grunt, { conversionType }) => {
  // BLAST configuration
  let buildAlias = [conversionType, 'replace:liveImages', 'spreadsheet'];

  // Newsletter configuration overwrite
  if (conversionType === 'newsletter') {
    buildAlias = buildAlias.concat(['replace:shortenClasses', 'htmlmin']);
  }

  const commonTasks = {
    group1: ['clean:dist', 'sass:dist'],
    group2: ['assemble', 'juice', 'imagemin'],
    group3: ['replace:importantStyle', 'replace:removeClasses', 'replace:fixResponsive', 'replace:srcImages']
  };

  return {
    default: ['serve'],

    newsletter: [...commonTasks.group1, ...commonTasks.group2, ...commonTasks.group3, 'replace:removeDupStyles'],

    blast: [...commonTasks.group1, ...commonTasks.group2, ...commonTasks.group3],

    serve: [conversionType, 'buildPreview', 'express', 'open', 'watch'],

    report: ['spreadsheet'],

    upload: ['imagemin', 'sftp-deploy'],

    build: buildAlias,

    buildPreview: ['sass:preview', 'postcss:preview'],

    publish: ['build', 'copy', 'compress', 'clean:all'],

    test: ['sass']
  };
};

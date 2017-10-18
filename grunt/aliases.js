module.exports = (grunt, { conversionType }) => {
  // BLAST configuration
  let buildAlias = [conversionType, 'replace:live_images', 'spreadsheet'];

  // Newsletter configuration overwrite
  if (conversionType === 'newsletter' || conversionType === 'proposal' || conversionType === 'oyez') {
    buildAlias = buildAlias.concat(['replace:shorten_classes', 'htmlmin']);
  }

  const commonTasks = {
    group1: ['clean:dist', 'sass:dist'],
    group2: ['assemble', 'juice', 'imagemin'],
    group3: ['replace:important_style', 'replace:remove_classes', 'replace:fix_responsive', 'replace:src_images']
  };

  return {
    default: ['serve'],

    report: ['spreadsheet'],

    newsletter: [...commonTasks.group1, ...commonTasks.group2, ...commonTasks.group3, 'replace:remove_dup_styles'],

    blast: [...commonTasks.group1, ...commonTasks.group2, ...commonTasks.group3],

    proposal: [...commonTasks.group1, 'cssmin', ...commonTasks.group2, 'replace:src_images'],

    oyez: [...commonTasks.group1, ...commonTasks.group2, ...commonTasks.group3, 'replace:remove_dup_styles'],

    build: buildAlias,

    serve: [
      // Serve based on conversion type.
      conversionType,
      'sass:preview',
      'postcss:preview',
      'express',
      'open',
      'watch'
    ],

    upload: ['imagemin', 'sftp-deploy'],

    publish: ['build', 'copy', 'compress', 'clean:all'],

    test: ['sass']
  };
};

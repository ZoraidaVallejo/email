'use strict';

// Compress images
module.exports = {
  options: { advanced: false },

  target: {
    files: [
      {
        expand: true,
        cwd: '<%= paths.src %>/css',
        src: ['*.css', '!OpenSansFamily.css'],
        dest: '<%= paths.src %>/css',
        ext: '.css'
      }
    ]
  }
};

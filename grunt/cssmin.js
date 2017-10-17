module.exports = {
  options: {
    level: {
      1: {
        roundingPrecision: 5
      }
    }
  },
  proposal: {
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

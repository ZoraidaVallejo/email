module.exports = {
  target: {
    options: {
      optimizationLevel: 3,
      svgoPlugins: [
        {
          removeViewBox: false
        }
      ]
    },
    files: [
      {
        expand: true,
        cwd: '<%= paths.srcImg %>',
        src: ['**/*.{png,jpg,gif}'],
        dest: '<%= paths.distImg %>'
      }
    ]
  }
};

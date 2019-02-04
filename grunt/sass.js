const path = require('path');
const sass = require('node-sass');
const Eyeglass = require('eyeglass');

const cwd = process.cwd();

// Takes your SCSS files and compiles them to CSS
module.exports = (grunt, { version, paths }) => ({
  dist: {
    options: Eyeglass({
      implementation: sass,
      outputStyle: 'expanded',
      includePaths: [path.join(cwd, '/common/partials/')]
    }),
    files: [
      {
        expand: true,
        cwd: `${paths.src}${!version ? '/css' : ''}/scss`,
        src: ['*.scss'],
        dest: `${paths.src}/css`,
        ext: '.css'
      }
    ]
  },

  // This task compiles Sass for the browser-baed preview UI.
  // You should not need to edit it.
  preview: {
    options: {
      style: 'compressed',
      implementation: sass
    },
    files: {
      '<%= paths.preview %>/css/preview.css': '<%= paths.preview %>/scss/preview.scss'
    }
  }
});

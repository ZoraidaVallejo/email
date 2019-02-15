const path = require('path');
const sass = require('node-sass');
const Eyeglass = require('eyeglass');

const cwd = process.cwd();

// Takes your SCSS files and compiles them to CSS
module.exports = (grunt, { paths }) => {
  const includePaths = [path.join(cwd, '/common/partials/')];
  const files = [
    {
      expand: true,
      cwd: path.join(paths.src, 'scss'),
      src: ['*.scss'],
      dest: path.join(paths.src, 'css'),
      ext: '.css'
    }
  ];

  return {
    dist: {
      options: Eyeglass({
        implementation: sass,
        outputStyle: 'compressed',
        includePaths
      }),
      files
    },

    devel: {
      options: Eyeglass({
        implementation: sass,
        outputStyle: 'expanded',
        includePaths
      }),
      files
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
  };
};

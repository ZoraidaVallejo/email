const sass = require('node-sass');
const Eyeglass = require('eyeglass');
const customFunctions = require('../lib/sass-functions');

const includePaths = ['common/partials/'];
const files = [
  {
    expand: true,
    cwd: '<%= paths.src %>/scss',
    src: ['*.scss'],
    dest: '<%= paths.src %>/css',
    ext: '.css'
  }
];

module.exports = {
  dist: {
    options: Eyeglass({
      implementation: sass,
      outputStyle: 'compressed',
      includePaths,
      functions: customFunctions
    }),
    files
  },

  devel: {
    options: Eyeglass({
      implementation: sass,
      outputStyle: 'expanded',
      includePaths,
      functions: customFunctions
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

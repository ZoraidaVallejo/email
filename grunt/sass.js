'use strict';

// Takes your SCSS files and compiles them to CSS
var eyeglass = require('eyeglass');

module.exports = {

    dist: {
        options: eyeglass({
            outputStyle: 'expanded'
        }),
        files: [{
            expand: true,
            cwd: '<%= paths.src %>/css/scss',
            src: ['*.scss'],
            dest: '<%= paths.src %>/css',
            ext: '.css'
        }]
    },

    // This task compiles Sass for the browser-baed preview UI.
    // You should not need to edit it.
    preview: {
        options: {
            style: 'compressed'
        },
        files: {
            '<%= paths.preview %>/css/preview.css': '<%= paths.preview %>/scss/preview.scss'
        }
    }
};

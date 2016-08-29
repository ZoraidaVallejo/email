'use strict';

// Takes your SCSS files and compiles them to CSS
var eyeglass = require('eyeglass');

module.exports = {
    dist: {
        options: eyeglass({
            outputStyle: 'expanded'
        }),
        files: {
            '<%= paths.src %>/css/main.css': '<%= paths.src %>/css/scss/main.scss',
            '<%= paths.src %>/css/preserve.css': '<%= paths.src %>/css/scss/preserve.scss'
        }
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

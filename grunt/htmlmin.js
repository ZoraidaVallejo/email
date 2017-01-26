'use strict';

// Compress images
module.exports = {

    live: {
        options: {
            removeComments: true,
            collapseWhitespace: true
            // minifyCSS: true
            // processConditionalComments: true
        },
        files: [{
            expand: true,
            flatten: true,
            src: '<%= paths.dist %>/*.html',
            dest: '<%= paths.dist %>'
        }]
    }
};

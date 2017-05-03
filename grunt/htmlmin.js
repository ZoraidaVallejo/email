'use strict';

// Compress images
module.exports = {

    live: {
        options: {
            removeComments: false,
            collapseWhitespace: true,
            removeEmptyAttributes: function(attrName) {
                return attrName === 'style';
            }
        },
        files: [{
            expand: true,
            flatten: true,
            src: '<%= paths.dist %>/*.html',
            dest: '<%= paths.dist %>'
        }]
    }
};

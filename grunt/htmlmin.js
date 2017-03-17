'use strict';

// Compress images
module.exports = {

    live: {
        options: {
            removeComments: true,
            collapseWhitespace: true,
            removeEmptyAttributes: function(attrName, tag) {
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

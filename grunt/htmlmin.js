'use strict';

// Compress images
module.exports = {
    live: {
        options: {
            removeComments: true,
            collapseWhitespace: true,
            minifyCSS: true
            // processConditionalComments: true
        },
        files: {
            '<%= paths.dist %>/<%= watchFile %>.html': '<%= paths.dist %>/<%= watchFile %>.html',
        }
    }
};

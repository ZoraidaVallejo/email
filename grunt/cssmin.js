'use strict';

// Compress images
module.exports = {
    options: {
        advanced: false
    },

    target: {
        files: {
            '<%= paths.src %>/css/preserve.css': '<%= paths.src %>/css/preserve.css'
        }
    }
};

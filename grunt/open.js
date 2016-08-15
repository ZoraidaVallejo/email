'use strict';

// Browser-based preview task
module.exports = function(grunt) {
    
    return {

        preview: {
            path: 'http://localhost:<%= port %>'
        }
    };
};

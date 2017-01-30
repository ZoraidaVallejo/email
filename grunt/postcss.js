'use strict';

// Browser-based preview task
module.exports = {

    preview: {
        options: {
            map: false,
            processors: [
                require('autoprefixer')({
                    browsers: ['last 2 versions']
                })
            ]
        },
        src: 'preview/css/preview.css'
    }
};

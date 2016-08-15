'use strict';

// Browser-based preview task
module.exports = {
    preview: {
        options: {
            map: false,
            processors: [
                require('autoprefixer')({
                    browsers: ['Chrome >= 30', 'ff >= 30', 'ie >= 9', 'ios_saf >= 6.1', 'Safari >= 6', 'Android >= 3']
                })
            ]
        },
        src: 'preview/css/preview.css'
    }
};

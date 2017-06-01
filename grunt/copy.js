'use strict';

module.exports = function(grunt, options) {

    return {
        public: {
            expand: true,
            cwd: 'dist/',
            src: ['*.html'],
            dest: `public/${ options.conversionType }/${ options.current_year }/${ options.current_month }/`,
            filter: 'isFile'
        }
    };
};

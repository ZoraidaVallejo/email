'use strict';

// Inlines your CSS
module.exports = {
    main: {
        options: {
            archive: '<%= compressName %>.zip'
        },
        files: [
            {
                expand: true,
                cwd: '<%= paths.dist %>/',
                src: ['*.html'],
                dest: '<%= paths.dist %>/'
            },
            {
                expand: true,
                cwd: '<%= paths.src %>/',
                src: ['**/*'],
                dest: '<%= paths.src %>/'
            }
        ]
    }
};

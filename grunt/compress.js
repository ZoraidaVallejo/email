'use strict';

// Inlines your CSS
module.exports = {
    main: {
        options: {
            archive: '<%= compressedFileName %>.zip'
        },
        files: [
            {
                src: ['Gruntfile.js'],
                dest: '/',
                filter: 'isFile'
            },
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

'use strict';

// Inlines your CSS
module.exports = {
    main: {
        options: {
            archive: '<%= compressed_file_name %>.zip'
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
            },
            {
                expand: true,
                cwd: 'grunt/',
                src: ['**/*'],
                dest: 'grunt/'
            }
        ]
    }
};

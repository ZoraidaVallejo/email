'use strict';

// Inlines your CSS
module.exports = {
    main: {
        options: {
            archive: '<%= watchFile %>.zip'
        },
        files: [
            {
                src: ['<%= paths.dist %>/<%= watchFile %>.html'],
                dest: '/',
                filter: 'isFile'
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

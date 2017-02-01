'use strict';

// Assembles your email content with HTML layout
module.exports = {

    options: {
        layoutdir: '<%= paths.src %>/layouts',
        partials: ['<%= paths.src %>/partials/**/*.hbs'],
        plugins: 'grunt-assemble-contextual',
        contextual: {
            dest: './temp/'
        },
        helpers: 'handlebars-helpers',
        data: ['<%= paths.src %>/data/*.{json,yml}'],
        flatten: true
    },

    pages: {
        src: ['<%= paths.src %>/emails/*.hbs'],
        dest: '<%= paths.dist %>/'
    }
};

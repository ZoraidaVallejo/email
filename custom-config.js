'use strict';

module.exports = {
    port: 4000,
    justatic_version: '20170101',
    current_year: '2017',
    current_month: '01',

    // Re-usable filesystem path variables
    paths: {
        src: 'src',
        src_img: 'src/img',
        dist: 'dist',
        dist_img: 'dist/img',
        preview: 'preview',
        live_img: 'https://justatic.com/v/<%= justatic_version %>/emails/images/newsletters/<%= current_year %>/<%= current_month %>',
        remote_img_path: '/mnt/files/emails/images/newsletters/<%= current_year %>/<%= current_month %>'
    },

    file_to_send: 'newsletter-<%= current_year %>-<%= current_month %>.html',
    compressed_file_name: 'newsletter-<%= current_year %>-<%= current_month %>'
}

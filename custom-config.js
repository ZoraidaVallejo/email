'use strict';

module.exports = {
    conversionType: 'blast',
    port: 4000,
    justatic_version: '1',
    current_year: '0000',
    current_month: '00',

    // Re-usable filesystem path variables
    paths: {
        src: 'src',
        src_img: 'src/img',
        dist: 'dist',
        dist_img: 'dist/img',
        preview: 'preview',
        live_img: 'https://justatic.com/v/<%= justatic_version %>/emails/images/lawyer-directory/<%= current_year %>/<%= current_month %>',
        remote_img_path: '/mnt/files/emails/images/lawyer-directory/<%= current_year %>/<%= current_month %>'
    },

    file_to_send: 'newsletter-<%= current_year %>-<%= current_month %>.html',
    compressed_file_name: 'newsletter-<%= current_year %>-<%= current_month %>'
}

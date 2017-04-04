'use strict';

module.exports = function(grunt, options) {

    // BLAST configuration
    var buildAlias = [
        options.conversionType,
        'replace:live_images'
    ];

    // Newsletter configuration overwrite
    if (options.conversionType === 'newsletter' || options.conversionType === 'proposal') {
        buildAlias = buildAlias.concat([
            'replace:shorten_classes',
            'htmlmin:live'
        ]);
    }

    return {
        default: ['newsletter'],

        newsletter: [
            'clean',
            'sass:dist',
            'assemble',
            'juice',
            'imagemin',
            'replace:important_style',
            'replace:remove_classes',
            'replace:fix_responsive',
            'replace:src_images',
            'replace:remove_dup_styles'
        ],

        blast: [
            'clean',
            'sass:dist',
            'assemble',
            'juice',
            'imagemin',
            'replace:important_style',
            'replace:remove_classes',
            'replace:fix_responsive',
            'replace:src_images'
        ],

        proposal: [
            'clean',
            'sass:dist',
            'cssmin',
            'assemble',
            'juice',
            'imagemin',
            'replace:src_images'
        ],

        build: buildAlias,

        serve: [
            options.conversionType,
            'sass:preview',
            'postcss:preview',
            'express',
            'open',
            'watch'
        ],

        upload: [
            options.conversionType,
            'imagemin',
            'sftp-deploy'
        ],

        zip: [
            'compress'
        ],

        test: [
            'sass'
        ]
    };
};

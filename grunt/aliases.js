'use strict';

module.exports = function(grunt, options) {

    // BLAST configuration
    var buildAlias = [
        options.conversionType,
        'replace:live_images',
        'spreadsheet'
    ];

    // Newsletter configuration overwrite
    if (options.conversionType === 'newsletter'
        || options.conversionType === 'proposal'
        || options.conversionType === 'oyez') {
        buildAlias = buildAlias.concat([
            'replace:shorten_classes',
            'htmlmin:live'
        ]);
    }

    return {
        default: ['serve'],

        report: ['spreadsheet:all'],

        newsletter: [
            'clean:dist',
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
            'clean:dist',
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
            'clean:dist',
            'sass:dist',
            'cssmin',
            'assemble',
            'juice',
            'imagemin',
            'replace:src_images'
        ],

        oyez: [
            'clean:dist',
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
            'imagemin',
            'sftp-deploy:images'
        ],

        publish: [
            'build',
            'copy',
            'compress',
            'clean:all'
        ],

        test: [
            'sass'
        ]
    };
};

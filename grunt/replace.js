'use strict';

// Replace compiled template images sources from ../src/html to ../dist/html
module.exports = function() {

    var leftPad = function leftPad(number, targetLength = 2) {
        let output = number + '';

        while (output.length < targetLength) {
            output = '0' + output;
        }

        return output;
    };

    var allTemplates = [{
        expand: true,
        flatten: true,
        src: ['<%= paths.dist %>/*.html'],
        dest: '<%= paths.dist %>'
    }];

    var cssClasses = [
        'collapse-one',
        'mobile-reset-width',
        'mobile-reset-height',
        'mobile-reset-bg-image',
        'mobile-hide',
        'mobile-align-center',
        'mobile-fz-20',
        'mobile-padding-top',
        'mobile-padding-right',
        'mobile-padding-bottom',
        'mobile-padding-left',
        'mobile-padding-horizontal-sides',
        'mobile-padding-vertical-sides',
        'mobile-padding-full',
        'mobile-padding-uneven-top',
        'mobile-padding-uneven-bottom',
        'mobile-padding-uneven-full',
        'mobile-no-padding-top',
        'mobile-no-padding-bottom',
        'mobile-no-padding-horizontal-sides',
        'mobile-no-float',
        'mobile-no-border'
    ];

    var htmlOptim = {
        'td': [
            'vertical-align',
            'text-align',
            'background-color'
        ],
        'table': [
            'background-color'
        ]
    };

    // Set configuration to shorten classes
    var classesToReplace = [];

    for (let i = 0; i < cssClasses.length; i++) {
        classesToReplace.push({
            match: new RegExp(cssClasses[i], 'g'),
            replacement: 'justia' + leftPad(i + 1)
        });
    }

    // Set configuration to remove duplicated styles
    var styleToRemove = [];

    for (let element in htmlOptim) {

        for (let cssStyle of htmlOptim[element]) {
            styleToRemove.push({
                match: new RegExp('(<' + element + '[^>]+?)(' + cssStyle + '[ ]*:[ ]*[^;]+;)', 'g'),
                replacement: '$1'
            });
        }
    }

    return {

        src_images: {
            options: {
                usePrefix: false,
                patterns: [{
                    // Matches <img * src="../src/img/, <img * src='../src/img/', <v * src='../src/img/ or <td * background='../src/img/
                    match: /(<(?:img|v|td)[^>]+?(?:src|background)=[\"'])(\.\.\/src\/img\/)/gi,
                    replacement: '$1../<%= paths.dist_img %>/'
                }, {
                    // Matches url('../src/img') or url(../src/img) and even url("../src/img")
                    match: /(url\(*[^)])(\.\.\/src\/img\/)/gi,
                    replacement: '$1../<%= paths.dist_img %>/'
                }]
            },
            files: allTemplates
        },

        // Replace width="176 !important" in table tag
        important_style: {
            options: {
                usePrefix: false,
                patterns: [{
                    match: /(<(?:img|table|td)[^>]+?(?:width|height)=[\"']+?\d+(?:%|px|))( !important)/gi,
                    replacement: '$1'
                }]
            },
            files: allTemplates
        },

        shorten_classes: {
            options: {
                usePrefix: false,
                patterns: classesToReplace
            },
            files: allTemplates
        },

        remove_dup_styles: {
            options: {
                usePrefix: false,
                patterns: styleToRemove
            },
            files: allTemplates
        },

        remove_classes: {
            options: {
                usePrefix: false,
                patterns: [{
                    match: /class=["']?(?:.(?!["']?\s+(?:\S+)=|[>"']))+.["']?/g,
                    replacement: ''
                }]
            },
            files: allTemplates
        },

        fix_responsive: {
            options: {
                usePrefix: false,
                patterns: [{
                    match: /\s(?:responsive|id)=/g,
                    replacement: ' class='
                }, {
                    match: /\s(?:responsive|id)=""/g,
                    replacement: ''
                }]
            },
            files: allTemplates
        },

        live_images: {
            options: {
                usePrefix: false,
                patterns: [{
                    match: /(<(?:img|v|td)[^>]+?(?:src|background)=[\"'])(\.\.\/dist\/img\/)/gi,
                    replacement: '$1<%= paths.live_img %>/'
                }, {
                    match: /(url\(*[^)])(\.\.\/dist\/img\/)/gi,
                    replacement: '$1<%= paths.live_img %>/'
                }]
            },
            files: allTemplates
        }
    };
};

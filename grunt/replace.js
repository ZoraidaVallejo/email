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

    let allTemplates = [{
        expand: true,
        flatten: true,
        src: ['<%= paths.dist %>/*.html'],
        dest: '<%= paths.dist %>'
    }];

    let cssClasses = [
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

    let classesToReplace = [];

    for (let i = 0; i < cssClasses.length; i++) {
        classesToReplace.push({
            match: new RegExp(cssClasses[i], 'g'),
            replacement: 'justia' + leftPad(i + 1)
        });
    }

    return {
        src_images: {
            options: {
                usePrefix: false,
                patterns: [
                    {
                        match: /(<(?:img|v|td)[^>]+?(?:src|background)=[\"'])(\.\.\/src\/img\/)/gi,  // Matches <img * src="../src/img/, <img * src='../src/img/', <v * src='../src/img/ or <td * background='../src/img/
                        replacement: '$1../<%= paths.dist_img %>/'
                    },
                    {
                        match: /(url\(*[^)])(\.\.\/src\/img\/)/gi,  // Matches url('../src/img') or url(../src/img) and even url("../src/img")
                        replacement: '$1../<%= paths.dist_img %>/'
                    }
                ]
            },
            files: allTemplates
        },


        // Replace width="176 !important" in table tag
        important_style: {
            options: {
                usePrefix: false,
                patterns: [
                    {
                        match: /(<(?:img|table|td)[^>]+?(?:width|height)=[\"']+?\d+(?:%|px|))( !important)/gi,
                        replacement: '$1'
                    }
                ]
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


        remove_classes: {
            options: {
                usePrefix: false,
                patterns: [
                    {
                        // match: /(?:class|responsive)=["']?(?:.(?!["']?\s+(?:\S+)=|[>"']))+.["']?/g,
                        match: /class=["']?(?:.(?!["']?\s+(?:\S+)=|[>"']))+.["']?/g,
                        replacement: ''
                    }
                ]
            },
            files: allTemplates
        },


        fix_responsive: {
            options: {
                usePrefix: false,
                patterns: [
                    {
                        match: /\s(?:responsive|id)=/g,
                        replacement: ' class='
                    },
                    {
                        match: /\s(?:responsive|id)=""/g,
                        replacement: ''
                    }
                ]
            },
            files: allTemplates
        },


        live_images: {
            options: {
                usePrefix: false,
                patterns: [
                    {
                        match: /(<(?:img|v|td)[^>]+?(?:src|background)=[\"'])(\.\.\/dist\/img\/)/gi,
                        replacement: '$1<%= paths.live_img %>/'
                    },
                    {
                        match: /(url\(*[^)])(\.\.\/dist\/img\/)/gi,
                        replacement: '$1<%= paths.live_img %>/'
                    }
                ]
            },
            files: allTemplates
        }
    };
};

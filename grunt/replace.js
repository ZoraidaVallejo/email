'use strict';

// Replace compiled template images sources from ../src/html to ../dist/html
module.exports = function() {

    var allTemplates = [{
        expand: true,
        flatten: true,
        src: ['<%= paths.dist %>/*.html'],
        dest: '<%= paths.dist %>'
    }];

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


        dup_style: {
            options: {
                usePrefix: false,
                patterns: [
                    {
                        match: /(<\/style>\n<style type=.+>)/g,
                        replacement: ''
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
                    },
                    {
                        match: /stylecustom/g,
                        replacement: 'style'
                    }
                ]
            },
            files: allTemplates
        },


        shorten_classes: {
            options: {
                usePrefix: false,
                patterns: [
                    { match: /collapse-one/g, replacement: 'justia01' },
                    { match: /mobile-reset-width/g, replacement: 'justia02' },
                    { match: /mobile-reset-height/g, replacement: 'justia03' },
                    { match: /mobile-reset-bg-image/g, replacement: 'justia04' },
                    { match: /mobile-hide/g, replacement: 'justia05' },
                    { match: /mobile-align-center/g, replacement: 'justia06' },
                    { match: /mobile-padding-top/g, replacement: 'justia07' },
                    { match: /mobile-padding-bottom/g, replacement: 'justia08' },
                    { match: /mobile-padding-horizontal-sides/g, replacement: 'justia09' },
                    { match: /mobile-padding-vertical-sides/g, replacement: 'justia10' },
                    { match: /mobile-padding-full/g, replacement: 'justia11' },
                    { match: /mobile-padding-uneven-top/g, replacement: 'justia12' },
                    { match: /mobile-padding-uneven-bottom/g, replacement: 'justia13' },
                    { match: /mobile-padding-uneven-full/g, replacement: 'justia14' },
                    { match: /mobile-no-padding-top/g, replacement: 'justia15' },
                    { match: /mobile-no-padding-bottom/g, replacement: 'justia16' },
                    { match: /mobile-no-padding-horizontal-sides/g, replacement: 'justia17' },
                    { match: /mobile-no-float/g, replacement: 'justia18' },
                    { match: /mobile-no-border/g, replacement: 'justia19' },
                ]
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
                        match: /(?:responsive|id)=/g,
                        replacement: 'class='
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
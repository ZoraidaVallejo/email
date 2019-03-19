const { leftPad } = require('../lib/helpers');

const allTemplates = [
  {
    expand: true,
    flatten: true,
    src: ['<%= relativeFolders.dist %>/*.html'],
    dest: '<%= relativeFolders.dist %>'
  }
];

const cssClasses = [
  'collapse-one',
  'mobile-reset-width',
  'mobile-reset-height',
  'mobile-reset-bg-image',
  'mobile-hide',
  'mobile-align-center',
  'mobile-align-right',
  'mobile-align-left',
  'mobile-fz-20',
  'mobile-fz-24',
  'mobile-fz-30',
  'mobile-padding-top',
  'mobile-padding-right',
  'mobile-padding-bottom',
  'mobile-padding-left',
  'mobile-padding-horizontal-sides',
  'mobile-padding-vertical-sides',
  'mobile-padding-full',
  'mobile-padding-medium-top',
  'mobile-padding-medium-bottom',
  'mobile-padding-uneven-top',
  'mobile-padding-uneven-bottom',
  'mobile-padding-uneven-full',
  'mobile-no-padding-top',
  'mobile-no-padding-bottom',
  'mobile-no-padding-horizontal-sides',
  'mobile-no-float',
  'mobile-no-border'
];

const htmlOptim = {
  td: ['width', 'height', 'text-align', 'vertical-align', 'background-color'],
  table: ['width', 'background-color'],
  img: ['width', 'height']
};

// Regex to match styles applied to specific tags
// (<td[^>]+?)(background-color[ ]*:[ ]*[^;]+;)
// (<table[^>]+?)((?<!(?:max|min)-)width[ ]*:[ ]*[^;]+;) --> Sadly, JS doesn't support negative look behinds in regex :(
// (<td[^>]+?(?:"|\s|;))(background-color[ ]*:[ ]*[^;]+;) --> Selected
const rgxOptim = '(<{{element}}[^>]+?(?:"|\\s|;))({{style}}[ ]*:[ ]*[^;]+;)';

// Set configuration to shorten classes
const classesToReplace = cssClasses.map((clss, idx) => ({
  match: new RegExp(clss, 'g'),
  replacement: `justia${leftPad(idx + 1)}`
}));

// Set configuration to remove duplicated styles
const styleToRemove = Object.keys(htmlOptim)
  .map(element =>
    htmlOptim[element].map(cssStyle => {
      const htmlRegex = rgxOptim.replace('{{element}}', element).replace('{{style}}', cssStyle);

      return {
        match: new RegExp(htmlRegex, 'g'),
        replacement: '$1'
      };
    })
  )
  .reduce((a, b) => a.concat(b), []);

module.exports = (grunt, { folders }) => {
  const imageRegexes = {
    devel: {
      // Matches <img * src="../src/images, <img * src='../src/images', <v * src='../src/images or <td * background='../src/images
      tags: new RegExp(`(<(?:img|v|td)[^>]+?(?:src|background)=["'])(../${folders.srcImg})`, 'gi'),
      // Matches url('../src/images') or url(../src/images) and even url("../src/images")
      css: new RegExp(`(url.[^)])(../${folders.srcImg})`, 'gi')
    },
    live: {
      tags: new RegExp(`(<(?:img|v|td)[^>]+?(?:src|background)=["'])(../${folders.distImg})`, 'gi'),
      css: new RegExp(`(url.[^)])(../${folders.distImg})`, 'gi')
    }
  };

  return {
    srcImages: {
      options: {
        usePrefix: false,
        patterns: [
          {
            match: imageRegexes.devel.tags,
            replacement: '$1../<%= folders.distImg %>'
          },
          {
            match: imageRegexes.devel.css,
            replacement: '$1../<%= folders.distImg %>'
          }
        ]
      },
      files: allTemplates
    },

    // Replace width="176 !important" in table tag
    importantStyle: {
      options: {
        usePrefix: false,
        patterns: [
          {
            match: /(<(?:img|table|td)[^>]+?(?:width|height)=["']+?d+(?:%|px|))( !important)/gi,
            replacement: '$1'
          }
        ]
      },
      files: allTemplates
    },

    shortenClasses: {
      options: {
        usePrefix: false,
        patterns: classesToReplace
      },
      files: allTemplates
    },

    classesToData: {
      options: {
        usePrefix: false,
        patterns: [
          {
            match: 'class=',
            replacement: 'data-class='
          }
        ]
      },
      files: allTemplates
    },

    removeDupStyles: {
      options: {
        usePrefix: false,
        patterns: styleToRemove,
        preserveOrder: true
      },
      files: allTemplates
    },

    removeClasses: {
      options: {
        usePrefix: false,
        patterns: [
          {
            match: /class=["']?(?:.(?!["']?\s+(?:\S+)=|[>"']))+.["']?/g,
            replacement: ''
          }
        ]
      },
      files: allTemplates
    },

    fixResponsive: {
      options: {
        usePrefix: false,
        patterns: [
          {
            match: /\s(?:data-id)=/g,
            replacement: ' id='
          },
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

    liveImages: {
      options: {
        usePrefix: false,
        patterns: [
          {
            // Use original dist folder path.
            match: imageRegexes.live.tags,
            replacement: '$1<%= liveImgPath %>'
          },
          {
            // Use original dist folder path.
            match: imageRegexes.live.css,
            replacement: '$1<%= liveImgPath %>'
          }
        ]
      },
      files: allTemplates
    }
  };
};

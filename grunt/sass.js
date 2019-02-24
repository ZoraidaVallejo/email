const path = require('path');
const font = require('css-font');
const sass = require('node-sass');
const Eyeglass = require('eyeglass');

const cwd = process.cwd();

// Takes your SCSS files and compiles them to CSS
module.exports = (grunt, { paths }) => {
  const includePaths = [path.join(cwd, '/common/partials/')];
  const files = [
    {
      expand: true,
      cwd: path.join(paths.src, 'scss'),
      src: ['*.scss'],
      dest: path.join(paths.src, 'css'),
      ext: '.css'
    }
  ];
  const customFunctions = {
    'shorthand-font($fontMap)': fontMap => {
      const config = {
        style: fontMap.getValue(0).getValue(),
        variant: fontMap.getValue(1).getValue(),
        weight: fontMap.getValue(2).getValue(),
        stretch: fontMap.getValue(3).getValue(),
        size: fontMap.getValue(4).getValue(),
        lineHeight: fontMap.getValue(5).getValue()
      };

      const familySassValue = fontMap.getValue(6);
      const familyArray = [];

      for (let idx = 0; idx < familySassValue.getLength(); idx += 1) {
        familyArray.push(familySassValue.getValue(idx).getValue());
      }

      config.family = familyArray
        .map(val => {
          if (/\s/.test(val)) {
            return `"${val}"`;
          }

          return val;
        })
        .join(', ');

      return sass.types.String(font.stringify(config));
    }
  };

  return {
    dist: {
      options: Eyeglass({
        implementation: sass,
        outputStyle: 'compressed',
        includePaths,
        functions: customFunctions
      }),
      files
    },

    devel: {
      options: Eyeglass({
        implementation: sass,
        outputStyle: 'expanded',
        includePaths,
        functions: customFunctions
      }),
      files
    },

    // This task compiles Sass for the browser-baed preview UI.
    // You should not need to edit it.
    preview: {
      options: {
        style: 'compressed',
        implementation: sass
      },
      files: {
        '<%= paths.preview %>/css/preview.css': '<%= paths.preview %>/scss/preview.scss'
      }
    }
  };
};

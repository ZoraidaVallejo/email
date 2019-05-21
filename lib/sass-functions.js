const font = require('css-font');
const sass = require('node-sass');

const customFunctions = {
  'shorthand-font($style, $variant, $weight, $stretch, $size, $line-height, $family)': function shorthandFont(
    style,
    variant,
    weight,
    stretch,
    size,
    lineHeight,
    family
  ) {
    const config = {
      style: style.getValue(),
      variant: variant.getValue(),
      weight: weight.getValue(),
      stretch: stretch.getValue(),
      size: `${size.getValue()}${size.getUnit()}`,
      lineHeight: `${lineHeight.getValue()}${lineHeight.getUnit()}`
    };

    if (config.lineHeight === '1') {
      config.lineHeight = config.size;
    }

    const familyArray = [];

    for (let idx = 0; idx < family.getLength(); idx += 1) {
      familyArray.push(family.getValue(idx).getValue());
    }

    config.family = familyArray
      .map(function quoteFontNames(val) {
        if (/\s/.test(val)) {
          return `"${val}"`;
        }

        return val;
      })
      .join(', ');

    return new sass.types.String(font.stringify(config));
  }
};

module.exports = customFunctions;

const util = require('handlebars-utils');
const helpers = require('handlebars-helpers');
const { htmlAttrs, inlineStyles } = require('./helpers');

const { camelcase, sanitize } = helpers();

const buttonStyles = {
  lightBlue: {
    backgroundColor: 'transparent',
    fontColor: '#00b3e3',
    fontWeight: '',
    borderColor: '#00b3e3'
  },
  white: {
    backgroundColor: 'transparent',
    fontColor: '#ffffff',
    fontWeight: '',
    borderColor: '#ffffff'
  },
  red: {
    backgroundColor: '#e2231a',
    fontColor: '#ffffff',
    fontWeight: 'bold',
    borderColor: '#e2231a'
  },
  yellow: {
    backgroundColor: '#ffc700',
    fontColor: '#000000',
    fontWeight: '',
    borderColor: '#ffc700'
  }
};

/**
 *
 * @param   {*}      options Built-in handlebar options.
 * @returns {String}         Bulletproof button.
 */
function button(options) {
  const opts = options;
  const preset = opts.hash.presetStyle ? camelcase(opts.hash.presetStyle) : 'lightBlue';

  const {
    href = '#',
    target = '_blank',
    height = '30px',
    width = '123px',
    backgroundColor,
    borderRadius = '3px',
    borderColor,
    fontColor,
    fontStyle = '',
    fontSize = '16px',
    fontWeight,
    fontFamily = 'Arial,sans-serif'
  } = Object.assign({}, buttonStyles[preset], opts.hash);

  const roundRectAttrs = htmlAttrs({
    'xmlns:v': 'urn:schemas-microsoft-com:vml',
    'xmlns:w': 'urn:schemas-microsoft-com:office:word',
    href,
    style: inlineStyles({
      height,
      vTextAnchor: 'middle',
      width
    }),
    arcsize: `${Math.round((parseInt(borderRadius, 10) * 100) / parseInt(height, 10))}%`,
    strokecolor: borderColor,
    fillcolor: backgroundColor
  });

  const centerRectAttrs = htmlAttrs({
    style: inlineStyles({
      color: fontColor,
      font: {
        fontStyle,
        fontWeight,
        fontSize,
        fontFamily
      }
    })
  });

  const anchorAttrs = htmlAttrs({
    href,
    style: inlineStyles({
      backgroundColor,
      border: `1px solid ${borderColor}`,
      borderRadius,
      color: fontColor,
      display: 'inline-block',
      font: {
        fontStyle,
        fontWeight,
        fontSize,
        lineHeight: height,
        fontFamily
      },
      textAlign: 'center',
      textDecoration: 'none',
      width,
      WebkitTextSizeAdjust: 'none',
      msoHide: 'all'
    }),
    target
  });

  const anchorContent = sanitize(util.value(true, this, options));

  return `
    <div>
      <!--[if mso]><v:roundrect ${roundRectAttrs}><w:anchorlock/><center ${centerRectAttrs}>${anchorContent.trim()}</center></v:roundrect><![endif]-->
      <a ${anchorAttrs}>
        ${anchorContent}
      </a>
    </div>
  `;
}

module.exports = button;

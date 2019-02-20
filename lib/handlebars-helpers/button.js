const util = require('handlebars-utils');
const helpers = require('handlebars-helpers');
const { htmlAttrs, inlineStyles } = require('./helpers');

const { camelcase, sanitize } = helpers();

const buttonStyles = {
  lightBlue: {
    width: '123px',
    height: '30px',
    backgroundColor: 'transparent',
    fontColor: '#00b3e3',
    fontSize: '16px',
    fontWeight: '',
    fontStyle: '',
    borderColor: '#00b3e3',
    borderRadius: '3px'
  },
  white: {
    width: '123px',
    height: '30px',
    backgroundColor: 'transparent',
    fontColor: '#ffffff',
    fontSize: '16px',
    fontWeight: '',
    fontStyle: '',
    borderColor: '#ffffff',
    borderRadius: '3px'
  },
  red: {
    width: '123px',
    height: '30px',
    backgroundColor: '#e2231a',
    fontColor: '#ffffff',
    fontSize: '16px',
    fontWeight: 'bold',
    fontStyle: '',
    borderColor: '#e2231a',
    borderRadius: '3px'
  },
  yellow: {
    width: '123px',
    height: '30px',
    backgroundColor: '#ffc700',
    fontColor: '#000000',
    fontSize: '16px',
    fontWeight: '',
    fontStyle: '',
    borderColor: '#ffc700',
    borderRadius: '3px'
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
    height,
    width,
    borderRadius,
    borderColor,
    backgroundColor,
    fontColor,
    fontSize,
    fontStyle,
    fontWeight
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
        style: fontStyle,
        weight: fontWeight,
        size: fontSize,
        family: fontFamily
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
        style: fontStyle,
        weight: fontWeight,
        size: fontSize,
      lineHeight: height,
        family: fontFamily
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

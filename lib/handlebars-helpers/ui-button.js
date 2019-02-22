const log = require('bilberry/log');
const util = require('handlebars-utils');
const helpers = require('handlebars-helpers');
const { htmlAttrs, inlineStyles, toPx } = require('./helpers');

const { camelcase, sanitize } = helpers();

const buttonDefaultValues = {
  href: '#',
  target: '_blank',
  height: 30,
  width: 125,
  borderRadius: 3,
  fontStyle: '',
  fontSize: 16,
  fontFamily: 'Arial,sans-serif'
};

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

const o2n = obj => {
  const res = {};

  Object.keys(obj).forEach(key => {
    const val = parseInt(obj[key], 10);

    res[key] = val || obj[key];
  });

  return res;
};

/**
 *
 * @param   {Object} options Built-in handlebar options.
 * @returns {String}         Bulletproof button.
 */
function uiButton(options) {
  const opts = options;
  const preset = opts.hash.presetStyle ? camelcase(opts.hash.presetStyle) : 'lightBlue';
  const config = Object.assign({}, buttonDefaultValues, buttonStyles[preset], opts.hash);

  const {
    href,
    target,
    height,
    width,
    backgroundColor,
    borderRadius,
    borderColor,
    fontColor,
    fontStyle,
    fontSize,
    fontWeight,
    fontFamily,
    responsive
  } = o2n(config);

  const roundRectAttrs = htmlAttrs({
    'xmlns:v': 'urn:schemas-microsoft-com:vml',
    'xmlns:w': 'urn:schemas-microsoft-com:office:word',
    href,
    style: inlineStyles({
      height: toPx(height),
      vTextAnchor: 'middle',
      width: toPx(width)
    }),
    arcsize: `${Math.round((borderRadius * 100) / height)}%`,
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
      borderRadius: toPx(borderRadius),
      color: fontColor,
      display: 'inline-block',
      font: {
        fontStyle,
        fontWeight,
        fontSize,
        lineHeight: toPx(height - 2),
        fontFamily
      },
      textAlign: 'center',
      textDecoration: 'none',
      width: toPx(width - 2),
      WebkitTextSizeAdjust: 'none',
      msoHide: 'all'
    }),
    target,
    responsive
  });

  const anchorContent = sanitize(util.value(true, this, options));

  // node-notifier
  if (width > 300 && typeof responsive === 'undefined') {
    log.info('test');
    console.log('');
  }

  return `
    <div>
      <!--[if mso]><v:roundrect ${roundRectAttrs}><w:anchorlock/><center ${centerRectAttrs}>${anchorContent.trim()}</center></v:roundrect><![endif]-->
      <a ${anchorAttrs}>
        ${anchorContent}
      </a>
    </div>
  `;
}

module.exports = uiButton;

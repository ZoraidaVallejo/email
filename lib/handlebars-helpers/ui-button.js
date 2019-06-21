const log = require('bilberry/log');
const notifier = require('node-notifier');
const util = require('handlebars-utils');
const helpers = require('handlebars-helpers');
const buttonStyles = require('./ui-button/preset-styles.json');
const buttonDefaultValues = require('./ui-button/default-values.json');
const { parseHtmlAttributes, inlineStyles, o2n, validValue } = require('../helpers');

const { camelcase, sanitize } = helpers();

// TODO:
// Add new button styles to the documntation.

/**
 *
 * @param   {Object} options Built-in handlebar options.
 * @returns {String}         Bulletproof button.
 */
function uiButton(options) {
  const preset = options.hash.presetStyle ? camelcase(options.hash.presetStyle) : 'justiaBlueGhost';
  const validOptions = {};

  Object.keys(options.hash).forEach(function filterValid(item) {
    if (validValue(options.hash[item])) {
      validOptions[item] = options.hash[item];
    }
  });

  const config = Object.assign({}, buttonDefaultValues, buttonStyles[preset], validOptions);

  if (config.class) {
    config.className = config.class;
  }

  const { fontFamily } = buttonDefaultValues;
  const {
    href,
    target,
    responsive,
    width,
    className,
    height,
    lineHeight,
    borderColor,
    borderRadius,
    backgroundColor,
    fontColor,
    fontStyle,
    fontWeight,
    fontSize,
    debug
  } = o2n(config);

  const roundRectAttrs = parseHtmlAttributes({
    'xmlns:v': 'urn:schemas-microsoft-com:vml',
    'xmlns:w': 'urn:schemas-microsoft-com:office:word',
    href,
    style: inlineStyles({
      width,
      height,
      vTextAnchor: 'middle'
    }),
    arcsize: `${Math.round((borderRadius * 100) / height)}%`,
    strokecolor: borderColor,
    fillcolor: backgroundColor
  });

  const centerRectAttrs = parseHtmlAttributes({
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

  const anchorAttrs = parseHtmlAttributes({
    href,
    style: inlineStyles({
      display: 'inline-block',
      width: width - 2,
      border: `1px solid ${borderColor}`,
      borderRadius,
      backgroundColor,
      color: fontColor,
      font: {
        fontStyle,
        fontWeight,
        fontSize,
        lineHeight: lineHeight || `${height - 2}px`,
        fontFamily
      },
      textAlign: 'center',
      textDecoration: 'none',
      WebkitTextSizeAdjust: 'none',
      msoHide: 'all'
    }),
    target,
    className,
    responsive,
    debug
  });

  const anchorContent = sanitize(util.value(true, this, options));

  if (width > 300 && typeof responsive == 'undefined') {
    const msg = `Button \`${anchorContent}\` is too big for mobile. Use responsive classes to make it fit!'`;
    log.info(msg);
    notifier.notify(msg);
  }

  return `
    <div>
      <!--[if gte mso 9]><v:roundrect ${roundRectAttrs}><w:anchorlock/><center ${centerRectAttrs}>${anchorContent.trim()}</center></v:roundrect><![endif]-->
      <a ${anchorAttrs}>
        ${anchorContent}
      </a>
    </div>
  `;
}

module.exports = uiButton;

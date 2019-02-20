const util = require('handlebars-utils');
const helpers = require('handlebars-helpers');
const { htmlAttrs, inlineStyles } = require('./helpers');

const { sanitize } = helpers();

const defaultTableAttributes = {
  href: '#',
  target: '_blank'
};

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
  }
};

function button(options) {
  const opts = options;
  opts.hash = Object.assign({}, defaultTableAttributes, buttonStyles.lightBlue, opts.hash);

  const roundRectAttrs = htmlAttrs({
    'xmlns:v': 'urn:schemas-microsoft-com:vml',
    'xmlns:w': 'urn:schemas-microsoft-com:office:word',
    href: opts.hash.href,
    style: inlineStyles({
      height: opts.hash.height,
      'v-text-anchor': 'middle',
      width: opts.hash.width
    }),
    arcsize: `${Math.round((parseInt(opts.hash.borderRadius, 10) * 100) / parseInt(opts.hash.height, 10))}%`,
    strokecolor: opts.hash.borderColor,
    fillcolor: opts.hash.backgroundColor
  });

  const centerRectAttrs = htmlAttrs({
    style: inlineStyles({
      color: opts.hash.fontColor,
      'font-style': opts.hash.fontStyle,
      'font-family': 'Arial,sans-serif',
      'font-size': opts.hash.fontSize,
      'font-weight': opts.hash.fontWeight
    })
  });

  const anchorAttrs = htmlAttrs({
    href: opts.hash.href,
    style: inlineStyles({
      'background-color': opts.hash.backgroundColor,
      border: `1px solid ${opts.hash.borderColor}`,
      'border-radius': opts.hash.borderRadius,
      color: opts.hash.fontColor,
      display: 'inline-block',
      'font-style': opts.hash.fontStyle,
      'font-family': 'Arial,sans-serif',
      'font-size': opts.hash.fontSize,
      'font-weight': opts.hash.fontWeight,
      'line-height': opts.hash.height,
      'text-align': 'center',
      'text-decoration': 'none',
      width: opts.hash.width,
      '-webkit-text-size-adjust': 'none',
      'mso-hide': 'all'
    }),
    target: opts.hash.target
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

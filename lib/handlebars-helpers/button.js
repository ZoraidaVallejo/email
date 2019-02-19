const util = require('handlebars-utils');

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
    fontWeight: 'normal',
    borderColor: '#00b3e3',
    borderRadius: '3px'
  }
};

const parseAttr = attributesObj =>
  Object.keys(attributesObj)
    .map(atr => `${atr}="${attributesObj[atr]}"`)
    .join(' ');

const parseInlineStyles = stylesObj => Object.keys(stylesObj)
    .map(prop => `${prop}:${stylesObj[prop]}`)
    .join(';');

function button(options) {
  const opts = options;

  opts.hash = Object.assign({}, defaultTableAttributes, buttonStyles.lightBlue, opts.hash);

  const roundRectAttrs = parseAttr({
    'xmlns:v': 'urn:schemas-microsoft-com:vml',
    'xmlns:w': 'urn:schemas-microsoft-com:office:word',
    href: opts.hash.href,
    style: parseInlineStyles({
      height: opts.hash.height,
      'v-text-anchor': 'middle',
      width: opts.hash.width
    }),
    arcsize: `${Math.round((parseInt(opts.hash.borderRadius, 10) * 100) / parseInt(opts.hash.height, 10))}%`,
    strokecolor: opts.hash.borderColor,
    fillcolor: opts.hash.backgroundColor
  });

  const centerRectAttrs = parseAttr({
    style: parseInlineStyles({
      color: opts.hash.fontColor,
      // 'font-family': 'Arial,sans-serif',
      'font-family': 'sans-serif',
      'font-size': opts.hash.fontSize
      // 'font-weight': opts.hash.fontWeight
    })
  });

  const anchorAttrs = parseAttr({
    href: opts.hash.href,
    style: parseInlineStyles({
      'background-color': opts.hash.backgroundColor,
      border: `1px solid ${opts.hash.borderColor}`,
      'border-radius': opts.hash.borderRadius,
      color: opts.hash.fontColor,
      display: 'inline-block',
      // 'font-family': 'Arial,sans-serif',
      'font-family': 'sans-serif',
      'font-size': opts.hash.fontSize,
      // 'font-weight': opts.hash.fontWeight,
      'line-height': opts.hash.height,
      'text-align': 'center',
      'text-decoration': 'none',
      width: opts.hash.width,
      '-webkit-text-size-adjust': 'none',
      'mso-hide': 'all'
    }),
    target: opts.hash.target
  });

  const anchorContent = util.value(true, this, options);

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

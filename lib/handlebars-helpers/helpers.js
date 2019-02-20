const validValue = val => !(typeof val === 'undefined' || !val || String(val).trim() === '');

const htmlAttrs = attributesObj =>
  Object.keys(attributesObj)
    .map(atr => (validValue(attributesObj[atr]) ? `${atr}="${attributesObj[atr]}"` : ''))
    .filter(val => val !== '')
    .join(' ');

const inlineStyles = stylesObj =>
  Object.keys(stylesObj)
    .map(prop => (validValue(stylesObj[prop]) ? `${prop}:${stylesObj[prop]}` : ''))
    .filter(val => val !== '')
    .join(';');

module.exports = {
  validValue,
  htmlAttrs,
  inlineStyles
};

const { utmVarsOrder } = require('../helpers');

/**
 * Concatenates all UTM variables.
 * @param   {Object} config UTM Variables.
 * @returns {String}
 */
const utmVariables = (...config) => {
  const options = config.pop();
  const baseVars = config[0] || {};

  // const { medium, campaign, source, content, term } = Object.assign({}, baseVars, options.hash);
  const allUtmVars = Object.assign({}, baseVars, options.hash);
  const result = [];

  utmVarsOrder.forEach(utmKey => {
    const utmValue = allUtmVars[utmKey];

    if (utmValue && typeof utmValue === 'string') {
      result.push(`utm_${utmKey}=${utmValue}`);
    }
  });

  return result.length > 0 ? `?${result.join('&')}` : '';
};

module.exports = utmVariables;

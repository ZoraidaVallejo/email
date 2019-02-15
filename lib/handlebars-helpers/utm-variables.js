/**
 * Concatenates all UTM variables.
 * @param  {Object} config UTM Variables.
 * @return {String}
 */
const utmVariables = (...config) => {
  const options = config.pop();
  const baseVars = config[0] || {};

  const { medium, campaign, source, content, term } = Object.assign({}, baseVars, options.hash);
  const result = [];

  if (medium && typeof medium === 'string') {
    result.push(`utm_medium=${medium}`);
  }

  if (campaign && typeof campaign === 'string') {
    result.push(`utm_campaign=${campaign}`);
  }

  if (source && typeof source === 'string') {
    result.push(`utm_source=${source}`);
  }

  if (content && typeof content === 'string') {
    result.push(`utm_content=${content}`);
  }

  if (term && typeof term === 'string') {
    result.push(`utm_term=${term}`);
  }

  return result.length > 0 ? `?${result.join('&')}` : '';
};

module.exports = utmVariables;

/**
 * Concatenates all UTM variables.
 * @param  {String} medium    Kind of format the link is contained in.
 * @param  {String} campaign  Campaign name.
 * @param  {String} source    The platform or website where the traffic originates.
 * @param  {String} content   Identifying information about the specific content they clicked on.
 * @param  {String} term      Information about the terms you are bidding on.
 * @return {String}
 */
const utmVariables = (medium, campaign, source, content, term) => {
  let result = `?utm_medium=${medium}&utm_campaign=${campaign}&utm_source=${source}`;

  if (content !== '' && typeof content !== 'undefined') {
    result += `&utm_content=${content}`;
  }

  console.log('medium', medium);
  console.log('campaign', campaign);
  console.log('source', source);
  console.log('content', content);
  console.log('term', term);

  if (term !== '' && typeof term !== 'undefined') {
    result += `&utm_term=${term}`;
  }

  return result;
};

module.exports = utmVariables;

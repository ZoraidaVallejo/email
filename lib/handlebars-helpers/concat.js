/**
 * Joins all the given strings.
 * @param  {...Strings} vals  Array of strings.
 * @return {String}           Full string.
 */
const concat = (...vals) => {
  vals.pop();

  return vals.join('');
};

module.exports = concat;

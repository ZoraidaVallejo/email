/**
 * Joins all the given strings.
 * @param   {...Strings} vals Array of strings.
 * @returns {String}          Full string.
 */
const concat = (...vals) => {
  const opts = vals.pop();
  let sep = '';

  if (opts && opts.hash.separator) {
    sep = opts.hash.separator;
  }

  return vals.join(sep);
};

module.exports = concat;

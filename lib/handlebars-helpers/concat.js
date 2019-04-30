/**
 * Joins all the given values.
 * @param   {...*}   vals Array of values.
 * @returns {String}      Full string.
 */
const concat = (...vals) => {
  const opts = vals.pop();
  let sep = '';

  if (opts && opts.hash.separator) {
    sep = opts.hash.separator;
  }

  return vals.filter(v => Boolean(v)).join(sep);
};

module.exports = concat;

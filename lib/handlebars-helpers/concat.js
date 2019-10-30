/**
 * Joins all the given values.
 * @param {...*} vals - Array of values.
 * @returns {string} Full string.
 */
function concat(...vals) {
    const opts = vals.pop();
    let sep = '';

    if (opts && opts.hash.separator) {
        sep = opts.hash.separator;
    }

    return vals.filter(Boolean).join(sep);
}

module.exports = concat;

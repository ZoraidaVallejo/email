/**
 * Test a value and return a "yes" or "no" argument based on the result.
 *
 * @param   {*}       test Value to test for truthiness.
 * @param   {String}  yes  Value to return when test is truthy
 * @param   {String}  no   Value to return when test is falsy
 * @returns {Boolean}
 */
function ternary(test, yes, no) {
  return (typeof test == 'function' ? test.call(this) : test) ? yes : no;
}

module.exports = ternary;

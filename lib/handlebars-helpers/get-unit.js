/**
 * Get the unit of the given value.
 * @param   {*}      val Any value.
 * @returns {String}     Unit.
 */
const getUnit = val => {
  const strNum = String(val);
  const unit = strNum.replace(/([0-9]|\.|,)+([\S]+)?/, '$2').trim();

  if (!unit) {
    return null;
  }

  return unit;
};

module.exports = getUnit;

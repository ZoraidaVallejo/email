/**
 * Get the unit of the given value.
 * @param   {*}      value Any value.
 * @returns {String}       Unit.
 */
function getUnit(value) {
  const strNum = String(value);
  const unit = strNum.replace(/([0-9]|\.|,)+([\S]+)?/, '$2').trim();

  if (!unit) {
    return null;
  }

  return unit;
}

module.exports = getUnit;

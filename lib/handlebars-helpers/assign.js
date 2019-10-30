/**
 * Set new variable to the current context.
 * @param {string} varName - Name.
 * @param {*} varValue - Any value.
 * @param {Object} options - Handlebar options.
 */
function assign(varName, varValue, options) {
    if (!options.data.root) {
        // eslint-disable-next-line no-param-reassign
        options.data.root = {};
    }
    // eslint-disable-next-line no-param-reassign
    options.data.root[varName] = varValue;
}

module.exports = assign;

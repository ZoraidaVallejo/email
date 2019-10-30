// TODO: Find a way to fill incomplete rows with values of the same type as the other elements.

/**
 * Splits the given array into chunks of the same size.
 * @param {Object[]} data - Array of any type of data to chunkify.
 * @param {number} chunkSize - Size of each chunk.
 * @param {boolean} [fillIncomplete=false] - Whether or not to ensure all chunks to have the same size.
 * @returns {Object[]} Array in chunks of the same size.
 */
function chunks(data, chunkSize, fillIncomplete = false) {
    var incompleteRow = data.length % chunkSize;
    var dataInCols = [];

    for (var i = 0; i < data.length; i += chunkSize) {
        dataInCols.push(data.slice(i, i + chunkSize));
    }

    if (fillIncomplete && incompleteRow) {
        dataInCols[dataInCols.length - 1].push(...Array(chunkSize - incompleteRow).fill({}));
    }

    return dataInCols;
}

module.exports = chunks;

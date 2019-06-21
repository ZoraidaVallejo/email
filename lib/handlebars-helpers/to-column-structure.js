// TODO:
// Add jsdocs and add to documentation.

function toColumnStructure(data, columns) {
  var incompleteRow = data.length % columns;
  var dataInCols = [];

  for (var i = 0; i < data.length; i += columns) {
    dataInCols.push(data.slice(i, i + columns));
  }

  if (incompleteRow) {
    dataInCols[dataInCols.length - 1].push(...Array(columns - incompleteRow).fill({}));
  }

  return dataInCols;
}

module.exports = toColumnStructure;

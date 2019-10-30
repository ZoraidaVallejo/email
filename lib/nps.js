const npsUtils = require('nps-utils');

const serialize = npsUtils.series;

function quoteScript(script, escaped) {
    var quote = escaped ? '\\"' : '"';
    var shouldQuote = script.includes(' ');

    return shouldQuote ? `${quote}${script}${quote}` : script;
}

function npsSeries(...scriptNames) {
    return serialize(
        ...scriptNames
            .filter(Boolean)
            .map(function trimScript(scriptName) {
                return scriptName.trim();
            })
            .filter(Boolean)
            .map(function createCommand(scriptName) {
                return `nps -c .npmscripts.js ${quoteScript(scriptName)}`;
            })
    );
}

function projectPath(path = '') {
    return `PROJECT_BASE_PATH="./${path}"`;
}

module.exports = {
    serialize,
    npsSeries,
    projectPath
};

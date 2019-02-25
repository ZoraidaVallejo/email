const fs = require('fs');
const npsUtils = require('nps-utils');

const serialize = npsUtils.series;
const quoteScript = (script, escaped) => {
  const quote = escaped ? '\\"' : '"';
  const shouldQuote = script.indexOf(' ') !== -1;
  return shouldQuote ? `${quote}${script}${quote}` : script;
};
const npsSeries = (...scriptNames) =>
  serialize(
    ...scriptNames
      .filter(Boolean)
      .map(scriptName => scriptName.trim())
      .filter(Boolean)
      .map(scriptName => `nps -c .npmscripts.js ${quoteScript(scriptName)}`)
  );

// eslint-disable-next-line import/no-unresolved, node/no-missing-require
const customConfig = fs.existsSync('./custom-config.json') ? require('./custom-config.json') : null;

let workflowVersion = 2;

if (customConfig && !customConfig.version) {
  workflowVersion = 1;
}

const linterTasks = workflowVersion >= 2 ? npsSeries('json.format.data', 'sass.lint.strict') : '';

const eslint = 'eslint "**/*.js"';
const prettier = 'prettier --write';
const stylelint = 'stylelint --syntax scss';
const sassPatterns = [
  'common/**/*.scss',
  'preview/scss/*.scss',
  'src/scss/**/*.scss',
  '!common/partials/_mail-resets.scss'
];

module.exports = {
  scripts: {
    default: 'grunt',
    test: 'node lib/test.js',
    js: {
      format: `${prettier} --single-quote --print-width=120 --parser=babel "**/*.js"`,
      lint: {
        default: `${eslint} || true`,
        fix: `${eslint} --fix`,
        strict: eslint
      }
    },
    sass: {
      format: `${stylelint} "${sassPatterns.join('" "')}" --fix`,
      lint: {
        default: `${stylelint} "${sassPatterns[0]}" || true`,
        strict: `${stylelint} "${sassPatterns[0]}"`
      }
    },
    json: {
      format: {
        default: `${prettier} --parser=json-stringify "**/*.json"`,
        data: `${prettier} --parser=json-stringify "custom-config.json" "src/**/*.json"`
      }
    },
    build: serialize(linterTasks, 'grunt build'),
    publish: serialize(linterTasks, 'grunt publish'),
    bump: serialize(npsSeries('js.lint.strict'), 'bilberry bump')
  }
};

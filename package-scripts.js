const fs = require('fs');
const npsUtils = require('nps-utils');

const serialize = npsUtils.series;
const customConfig = fs.existsSync('./custom-config.json') ? require('./custom-config.json') : null; // eslint-disable-line import/no-unresolved, node/no-missing-require

let workflowVersion = 2;

if (customConfig && !customConfig.version) {
  workflowVersion = 1;
}

const linterTasks = workflowVersion === 2 ? serialize.nps('json.format.data', 'sass.lint.strict') : '';

const localBins = {
  stylelint: {
    bin: './node_modules/.bin/stylelint --syntax scss',
    files: ['src/scss/**/*.scss', '!src/scss/preserve.scss']
  },
  prettier: './node_modules/.bin/prettier --write',
  eslint: './node_modules/.bin/eslint "**/*.js"'
};

module.exports = {
  scripts: {
    test: 'node scripts/test.js',

    optim: 'imageoptim --verbose --directory ./src/img',

    js: {
      format: `${localBins.prettier} --single-quote --print-width=140 --parser=flow "**/*.js"`,
      lint: {
        default: `${localBins.eslint} || true`,
        fix: `${localBins.eslint} --fix`,
        strict: localBins.eslint
      }
    },

    sass: {
      format: `${localBins.stylelint.bin} "${localBins.stylelint.files.join('" "')}" --fix`,
      lint: {
        default: `${localBins.stylelint.bin} "${localBins.stylelint.files[0]}" || true`,
        strict: `${localBins.stylelint.bin} "${localBins.stylelint.files[0]}"`
      }
    },

    json: {
      format: {
        default: `${localBins.prettier} --parser=json "*.json" "!package*.json" "!custom-config.json"`,
        data: `${localBins.prettier} --parser=json --print-width=999999 "custom-config.json" "src/data/*.json"`
      }
    },

    build: serialize(linterTasks, 'grunt build'),
    publish: serialize(linterTasks, 'grunt publish'),

    bump: serialize('nps js.lint.strict', 'node scripts/bump.js')
  }
};

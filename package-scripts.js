module.exports = {
  scripts: {
    test: 'node scripts/test.js',
    optim: 'imageoptim --verbose --directory ./src/img',
    sassformat: './node_modules/.bin/stylelint --syntax scss --fix "src/scss/**/*.scss" "!src/scss/preserve.scss"',
    sasslint: './node_modules/.bin/stylelint --syntax scss "src/scss/**/*.scss" || true',
    sasslintBreakOnErrors: './node_modules/.bin/stylelint --syntax scss "src/scss/**/*.scss"',
    jsonformat: './node_modules/.bin/prettier --write --parser=json "*.json" "!package*.json" "!custom-config.json"',
    jsonformatData: './node_modules/.bin/prettier --write --print-width=999999 --parser=json "custom-config.json" "src/data/*.json"',
    format: './node_modules/.bin/prettier --write --single-quote --print-width=140 --parser=flow "**/*.js"',
    lint: './node_modules/.bin/eslint "**/*.js" --format table || true',
    lintFix: './node_modules/.bin/eslint "**/*.js" --fix',
    lintBreakOnErrors: './node_modules/.bin/eslint "**/*.js" --format table',
    build: 'nps "jsonformatData npm run sasslint-break-on-errors && grunt build"',
    bump: 'nps "lintBreakOnErrors node scripts/bump.js"',
    publish: 'npm run jsonformat-data && npm run sasslint-break-on-errors && grunt publish'
  }
};

const path = require('path');

const cwd = process.cwd();

module.exports = (grunt, { paths }) => ({
  options: {
    configFile: path.join(cwd, '.stylelintrc.json'),
    failOnError: false,
    syntax: 'scss'
  },
  src: path.join(paths.src, 'scss/**/*.scss')
});

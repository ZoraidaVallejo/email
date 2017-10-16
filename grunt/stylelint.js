const cwd = process.cwd();
const path = require('path');

module.exports = {
  options: {
    configFile: path.join(cwd, '.stylelintrc.json'),
    failOnError: false,
    syntax: 'scss'
  },
  src: '<%= paths.src %>/css/scss/**/*.scss'
};

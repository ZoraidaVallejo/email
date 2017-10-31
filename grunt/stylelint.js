const cwd = process.cwd();
const path = require('path');

module.exports = (grunt, { version, paths }) => ({
  options: {
    configFile: path.join(cwd, '.stylelintrc.json'),
    failOnError: false,
    syntax: 'scss'
  },
  src: `${paths.src}${!version ? '/css' : ''}/scss/**/*.scss`
});

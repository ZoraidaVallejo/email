const ip = require('ip');
const opn = require('opn');

const localIp = ip.address();

module.exports = (grunt, opts) =>
  grunt.registerTask('open', 'Open IP.', () => opn(`http://${localIp}:${opts.port}`, { wait: false }));

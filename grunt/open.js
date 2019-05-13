const ip = require('ip');
const opn = require('opn');

const localIp = ip.address();

module.exports = function gruntOpen(grunt, opts) {
  return grunt.registerTask('open', 'Open IP.', function setOpenTask() {
    return opn(`http://${localIp}:${opts.port}`, { wait: false });
  });
};

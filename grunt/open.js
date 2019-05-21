const ip = require('ip');
const open = require('open');

const localIp = ip.address();

module.exports = function gruntOpen(grunt, opts) {
  return grunt.registerTask('open', 'Open IP.', function execNodeOpen() {
    return open(`http://${localIp}:${opts.port}`, { wait: false });
  });
};

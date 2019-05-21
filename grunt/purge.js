const cheerio = require('cheerio');
const log = require('bilberry/log');
const { leftPad } = require('../lib/helpers');

module.exports = function gruntPurge(grunt) {
  grunt.registerMultiTask('purge', 'Clean unused responsive classes.', function purge() {
    const done = this.async();

    this.filesSrc.forEach(function eachPath(filepath) {
      const originalEmail = grunt.file.read(filepath);
      const $ = cheerio.load(originalEmail);

      var htmlClasses = [
        ...new Set(
          $('[class]')
            .map(function getClasses(idx, element) {
              return $(element)
                .attr('class')
                .split(' ');
            })
            .get()
            .filter(function filterClasses(val) {
              return val != 'preheader' && val != 'ios-links-black' && val != '';
            })
        )
      ];

      var reponsiveClassesToRemove = $('style')
        .html()
        .match(/@media only screen and \(max-width:640px\)\{(.*)\}$/)[1]
        .match(/\.[\w-\s.]+\{/g)
        .map(function cleanStyles(val) {
          return val.replace('{', '').trim();
        })
        .filter(function checkClasses(val) {
          var holder = val.split('.');
          return !htmlClasses.includes(holder[holder.length - 1]);
        });

      var purgedEmail = originalEmail;

      // Purge unused classes.
      reponsiveClassesToRemove.forEach(function eachClassToPurge(classString) {
        purgedEmail = purgedEmail.replace(new RegExp(`(${classString}{[^}]+})`), '');
      });

      // Shorten remaining classes.
      htmlClasses.forEach(function eachClassToShorten(classString, idx) {
        purgedEmail = purgedEmail.replace(new RegExp(classString, 'g'), `justia${leftPad(idx + 1)}`);
      });

      grunt.file.write(filepath, purgedEmail);

      log.success(`File purged: ${filepath}`);
    });

    done();
  });

  return {
    purgeResponsive: {
      src: '<%= relativeFolders.dist %>/*.html'
    }
  };
};

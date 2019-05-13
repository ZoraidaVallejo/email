const cheerio = require('cheerio');
const log = require('bilberry/log');
const { leftPad } = require('../lib/helpers');

module.exports = function gruntPurge(grunt) {
  grunt.registerMultiTask('purge', 'Clean unused responsive classes.', function purge() {
    const done = this.async();

    // TODO: Function expression.
    this.filesSrc.forEach(filepath => {
      const originalEmail = grunt.file.read(filepath);
      const $ = cheerio.load(originalEmail);

      const htmlClasses = [
        ...new Set(
          $('[class]')
            // TODO: Function expression.
            .map((idx, element) =>
              $(element)
                .attr('class')
                .split(' ')
            )
            .get()
            // TODO: Function expression.
            .filter(val => val !== 'preheader' && val !== 'ios-links-black' && val !== '')
        )
      ];

      const reponsiveClassesToRemove = $('style')
        .html()
        .match(/@media only screen and \(max-width:640px\)\{(.*)\}$/)[1]
        .match(/\.[\w-\s.]+\{/g)
        // TODO: Function expression.
        .map(val => val.replace('{', '').trim())
        // TODO: Function expression.
        .filter(val => {
          var holder = val.split('.');
          return !htmlClasses.includes(holder[holder.length - 1]);
        });

      let purgedEmail = originalEmail;

      // Purge unused classes.
      // TODO: Function expression.
      reponsiveClassesToRemove.forEach(classString => {
        purgedEmail = purgedEmail.replace(new RegExp(`(${classString}{[^}]+})`), '');
      });

      // Shorten remaining classes.
      // TODO: Function expression.
      htmlClasses.forEach((classString, idx) => {
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


const cheerio = require('cheerio');
const log = require('bilberry/log');

module.exports = grunt => {
  grunt.registerMultiTask('purge', 'Clean unused responsive classes.', function purge() {
    const done = this.async();

    this.filesSrc.forEach(filepath => {
      const originalEmail = grunt.file.read(filepath);
      const $ = cheerio.load(originalEmail);

      const htmlClasses = [
        ...new Set(
          $('[class]')
            .map((idx, element) =>
              $(element)
                .attr('class')
                .split(' ')
            )
            .get()
            .filter(val => val !== 'preheader' && val !== 'ios-links-black')
        )
      ];

      const reponsiveClassesToRemove = $('style')
        .html()
        .match(/@media only screen and \(max-width:640px\)\{(.*)\}$/)[1]
        .match(/\.[\w-\s.]+\{/g)
        .map(val => val.replace('{', '').trim())
        .filter(val => {
          var holder = val.split('.');
          return !htmlClasses.includes(holder[holder.length - 1]);
        });

      let purgedEmail = originalEmail;

      reponsiveClassesToRemove.forEach(classString => {
        purgedEmail = purgedEmail.replace(new RegExp(`(${classString}{[^}]+})`), '');
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

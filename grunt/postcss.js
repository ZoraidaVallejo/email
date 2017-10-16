const Autoprefixer = require('autoprefixer');

module.exports = {
  preview: {
    options: {
      map: false,
      processors: [Autoprefixer]
    },
    src: 'preview/css/preview.css'
  }
};

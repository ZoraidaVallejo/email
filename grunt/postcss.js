// Browser-based preview task
module.exports = {
  preview: {
    options: {
      map: false,
      processors: [require('autoprefixer')]
    },
    src: 'preview/css/preview.css'
  }
};

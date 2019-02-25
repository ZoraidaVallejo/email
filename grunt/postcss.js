const MQpacker = require('css-mqpacker');
const Autoprefixer = require('autoprefixer');

module.exports = {
  preview: {
    options: {
      map: false,
      processors: [
        Autoprefixer,
        MQpacker({
          sort: true
        })
      ]
    },
    src: '<%= paths.preview %>/css/preview.css'
  },
  source: {
    options: {
      map: false,
      processors: [
        MQpacker({
          sort: true
        })
      ]
    },
    src: '<%= paths.src %>/css/*.css'
  }
};

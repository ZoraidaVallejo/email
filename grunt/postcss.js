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
    src: '<%= previewUI %>/css/preview.css'
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
    src: '<%= relativeFolders.src %>/css/*.css'
  }
};

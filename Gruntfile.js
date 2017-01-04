'use strict';

const customConfig = require('./custom-config.js');


module.exports = function(grunt) {

    const allRules = Object.assign({}, customConfig, {
        // secrets.json is ignored in git because it contains sensitive data
        // See the README for configuration settings
        secrets: grunt.file.readJSON('secrets.json')
    });

    require('load-grunt-config')(grunt, {

        // Pass data to tasks
        data: allRules
    });
};

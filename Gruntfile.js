/*
 * grunt-handlebars-page-builder
 * https://github.com/alexander.darland/grunt-handlebars-page-builder
 *
 * Copyright (c) 2015 alexander.darland
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    clean: {
      tests: ['tmp']
    },

    hb_page_builder: {
      dist: {
        options: {
          templateFolders: ['test/templates'],
          globalsFolder: 'test/data/globals',
          helpers: './../test/data/helpers/helpers.js'
        },
        files: {
          'tmp/': ['test/data/start-page.json']
        }
      }
    }

  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['clean', 'hb_page_builder']);
};

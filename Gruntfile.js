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
      options: {
        templateFolders: ['test/templates'],
        globalsFolder: 'test/data/globals',
        helpers: 'test/data/helpers/helpers.js',
        index: {
          data: 'test/data/presentation/index-data.json',
          view: 'test/index.html',
          dist: 'tmp/'
        }
      },
      dist: {
        pageFolder: 'test/data/pages',
        targetFolder: 'tmp/pages/'
      }
    }

  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['clean', 'hb_page_builder']);
};

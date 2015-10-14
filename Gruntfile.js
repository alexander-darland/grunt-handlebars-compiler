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

    hb_compiler: {
      dist: {
        options: {
          templateFolders: ['test/templates'],
          globals: 'test/data/globals'
        },
        files: {
          'tmp/': ['test/data/start-page.json']
        }
      }
    }

  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['clean', 'hb_compiler']);
};

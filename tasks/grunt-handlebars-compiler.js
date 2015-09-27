/*
 * grunt-handlebars-compiler
 * https://github.com/alexander.darland/grunt-handlebars-compiler
 *
 * Copyright (c) 2015 alexander.darland
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    grunt.registerMultiTask('hb_compiler', 'Compiles handlebar.js templates.', function() {

        var options = this.options(),
            hb = require('handlebars'),
            fs = require('fs'),
            path = require('path'),
            beautify = require('js-beautify').html;

        function registerPartialsRecursive(dirPath) {

            fs.readdirSync(dirPath).forEach(function (child) {

                var childUrl = dirPath + path.sep + child,
                    stats = fs.statSync(childUrl);

                if (stats.isDirectory()) {
                    registerPartialsRecursive(childUrl);
                }
                else if (stats.isFile()) {
                    var partialName = child.replace('.html', ''),
                        fileContent = grunt.file.read(childUrl, { encoding: 'utf8' });
                    hb.registerPartial(partialName, fileContent);
                }

            });

        }

        options.templateFolders.forEach(function(templateFolder) {
            registerPartialsRecursive(templateFolder);
        });

        this.files.forEach(function(file) {

            var src =       grunt.file.readJSON(file.src, { encoding: 'utf8' }),
                tmp =       grunt.file.read(src.layout, { encoding: 'utf8' }),
                template =  hb.compile(tmp),
                markup =    template(src.model),
                dest =      file.dest + src.fileName + '.html',
                beautifyOptions = {

                };

            grunt.file.write(dest, beautify(markup, beautifyOptions));

        });

    });
};

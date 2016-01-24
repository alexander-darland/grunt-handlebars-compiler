/*
 * grunt-handlebars-page-builder
 * https://github.com/alexander.darland/grunt-handlebars-page-builder
 *
 * Copyright (c) 2015 alexander.darland
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    grunt.registerMultiTask('hb_page_builder', 'Build static html pages with handlebar.js templates.', function() {

        var options = this.options(),
            pf = this.data.pageFolder,
            tf = this.data.targetFolder,
            hb = require('handlebars'),
            fs = require('fs'),
            path = require('path'),
            beautify = require('js-beautify').html,
            external,
            globals;

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

        function createGlobalObject() {

            globals = {};

            fs.readdirSync(options.globalsFolder).forEach(function (child) {

                var childUrl = options.globalsFolder + path.sep + child,
                    stats = fs.statSync(childUrl);

                if (stats.isFile()) {
                    var partialName = child.replace('.json', ''),
                        fileJson = grunt.file.readJSON(childUrl, { encoding: 'utf8' });

                    globals[partialName] = fileJson;
                }

            });

        }

        function fetchGlobalVariable(selectorString) {

            var selectorArray = selectorString.split('.'),
                currentLevel = globals;

            if (!selectorString) { return "Undefined"; }

            try {
                selectorArray.forEach(function (selector) {
                    if (currentLevel[selector]) {
                        currentLevel = currentLevel[selector];
                    } else {
                        console.warn('Could not find language string with selector "' + selectorString + '"');
                        currentLevel = null;
                        return false;
                    }
                });
            } catch (err) {
                currentLevel = null;
            }

            if (currentLevel) {
                return currentLevel;
            }

            return "Not Found";

        }

        function registerExternalHelpers() {

            external.helpers.forEach(function(self) {

                hb.registerHelper(self.name, self.func);

            });

        }

        function createPagesRecursive(pageFolder, targetFolder) {

            fs.readdirSync(pageFolder).forEach(function (child) {

                var childUrl = pageFolder + path.sep + child,
                    stats = fs.statSync(childUrl);

                if (stats.isDirectory()) {
                    createPagesRecursive(childUrl, targetFolder);
                }
                else if (stats.isFile() && path.extname(childUrl) == '.json') {

                    try {
                        var src =       grunt.file.readJSON(childUrl, { encoding: 'utf8' }),
                            tmp =       grunt.file.read(src.layout, { encoding: 'utf8' }),
                            template =  hb.compile(tmp),
                            markup =    template(src.model),
                            dest =      tf + path.relative(pf, childUrl).replace('.json', '.html'),
                            beautifyOptions = {

                            };

                        grunt.file.write(dest, beautify(markup, beautifyOptions));

                        console.log('File created:  ' + dest);

                    } catch (error) {
                        console.warn('Error writing file ' + child + ': ' + error.message);
                    }

                }

            });

        }

        function createIndexFile() {

            if(!options.index) { return false; }

            try {
                var data =      grunt.file.readJSON(options.index.data, { encoding: 'utf8' }),
                    tmp =       grunt.file.read(options.index.view, { encoding: 'utf8' }),
                    template =  hb.compile(tmp),
                    markup =    template(data),
                    dest =      options.index.dist + 'index.html',
                    beautifyOptions = { };

                grunt.file.write(dest, beautify(markup, beautifyOptions));

                console.log('File created:  ' + dest);

            } catch (error) {
                console.warn('Error writing index file: ' + error.message);
            }

        }

        hb.registerHelper('globals', function(selector) {

            if(!globals) { createGlobalObject(); }

            return fetchGlobalVariable(selector);

        });

        if(options.helpers) {
            var helpersRelativePath = './' + path.relative(__dirname, options.helpers);
            external = require(helpersRelativePath);
            registerExternalHelpers();
        }

        options.templateFolders.forEach(function(templateFolder) {
            registerPartialsRecursive(templateFolder);
        });

        createPagesRecursive(pf, tf);

        createIndexFile();

    });
};

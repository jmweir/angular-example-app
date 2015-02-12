module.exports = function (grunt) {
    'use strict';

    // automatically loads all of our grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        // Inject dependencies
        injector: {
            options: {
                addRootSlash: false
            },
            app: {
                files: {
                    'index.html': [ 'app/scripts/**/*.js', 'app/styles/**/*.css' ]
                }
            }
        },

        // Inject Bower Dependencies
        wiredep: {
            app: {
                src: [ 'index.html' ]
            }
        },

        // Grunt development server
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                base: '.'
            },
            app: {
            }
        },

        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep:app']
            }
        }

    });

    grunt.registerTask('default', [
        'wiredep',
        'injector',
        'connect:app',
        'watch'
    ]);
};
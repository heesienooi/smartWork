'use strict';

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: 'app'
    }

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            styles: {
                files: ['<%= yeoman.app %>/css/{,*/}*.css'],
                tasks: ['copy:styles', 'autoprefixer']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/*.html',
                    '<%= yeoman.app %>/templates/*.html',
                    '.tmp/css/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/js/{,*/}*.js',
                    '<%= yeoman.app %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        connect: {
            options: {
                port: 9090,
                livereload: 35729,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        yeomanConfig.app
                    ]
                }
            }
        },
        clean: {
            server: '.tmp'
        },
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/css/',
                    src: '{,*/}*.css',
                    dest: '.tmp/css/'
                }]
            }
        },
        copy: {
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= yeoman.app %>/css',
                dest: '.tmp/css/',
                src: '{,*/}*.css'
            }
        },
        bower: {
            options: {
                exclude: ['requirejs']
            },
            all: {
                rjsConfig: '<%= yeoman.app %>/js/main.js'
            }
        }
    });

    grunt.registerTask('server', function (target) {
        // Start CORS proxy server
        var cors_proxy = require("corsproxy");
        var http_proxy = require("http-proxy");
        var port = 1234;
        cors_proxy.options = {
            target: 'http://rmit.smap.com.au/'
        };
        http_proxy.createServer(cors_proxy).listen(port);
        grunt.log.writeln('Started CORS proxy on localhost:' + port);

        grunt.task.run([
            'clean:server',
            'copy:styles',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

};

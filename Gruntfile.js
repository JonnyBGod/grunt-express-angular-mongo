// Generated on 2013-04-03 using generator-webapp 0.1.5
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };

  grunt.initConfig({
    yeoman: yeomanConfig,
    watch: {
      coffee: {
        files: [
          '<%= yeoman.app %>/scripts/{,*/}*.coffee',
          'server/{,*/}*.coffee'
        ],
        tasks: ['coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/{,*/}*.coffee'],
        tasks: ['coffee:test']
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass']
      },
      livereload: {
        options: {
          livereload: true,
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          'server/{,*/}*.html',
          '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,webp}',
        ]
      }
    },
    open: {
      server: {
        //path: 'http://localhost:<%= connect.options.port %>'
        path: 'https://labs.imoglobe.com'
      }
    },
    clean: {
      dist: ['.tmp', '<%= yeoman.dist %>/*'],
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js',
        '!<%= yeoman.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['https://labs.imoglobe.com']
        }
      }
    },
    coffee: {
      dist: {
        files: [{
          // rather than compiling multiple files here you should
          // require them into your main .coffee file
          expand: true,
          cwd: '<%= yeoman.app %>/scripts',
          src: '*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: '.tmp/spec',
          src: '*.coffee',
          dest: 'test/spec'
        }]
      }
    },
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: 'app/components',
        relativeAssets: true
      },
      dist: {},
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    // not used since Uglify task does concat,
    // but still available if needed
    /*concat: {
      dist: {}
    },*/
    requirejs: {
      dist: {
        // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {
          baseUrl: 'app/scripts',
          // uses `app/scripts/main.js` as a starting point for optimization
          name: 'main',
          // final output file after optimization (uglifying, pruning has() tests, etc.)
          out: 'dist/scripts/main.js',
          // notifies the optimizer that has() test branches with this/these variables can be optimized out
          // http://requirejs.org/docs/optimization.html#hasjs
          has: {
            // a has() assignment only for unit testing. RequireJS modules are able to
            // return different values when unit tests set this variable to true
            //
            // http://arvelocity.com/2013/07/02/running-an-express-server-with-grunt-and-yeoman-part-3/
            internalTest: false,
          },
          paths: {
            //////////libs.js////////////
            jquery: '../components/jquery/jquery',
            bootstrap: '../components/bootstrap/dist/js/bootstrap',
            angular: '../components/angularjs-bower/angular',
            'angular-cookies': '../components/angularjs-bower/angular-cookies',
            'angular-sanitize': '../components/angularjs-bower/angular-sanitize',
            //////////main.js////////////
            domReady: '../components/requirejs-domready/domReady',
            'libs': '../scripts/libs',
            //App
            'app': '../scripts/app',
            analytics: '../scripts/analytics',
            services: '../scripts/services',
            controllers: '../scripts/controllers',
            filters: '../scripts/filters',
            directives: '../scripts/directives'
          },
          shim: {
            //////////libs.js////////////
            bootstrap: {
              deps: ['jquery'],
              exports: 'jquery'
            },
            angular: {
              deps: ['jquery'],
              exports: 'angular'
            },
            'angular-cookies': { deps: ['angular'] },
            'angular-sanitize': { deps: ['angular'] },
            //////////main.js////////////
            analytics: { deps: ['libs'], exports: 'analytics' },
            filters: { deps: ['libs'], exports: 'filters' },
            directives: { deps: ['libs'] },
            controllers: { deps: ['libs'] },
            'app': { deps: ['libs', 'analytics', 'filters'] },
            services: { deps: ['app'] },
          },
          priority: [
            'libs'
          ],
          //uglify2: {} // https://github.com/mishoo/UglifyJS2
          optimize: 'uglify2',
          // TODO: Figure out how to make sourcemaps work with grunt-usemin
          // https://github.com/yeoman/grunt-usemin/issues/30
          //generateSourceMaps: true,
          //useSourceUrl: true,
          // required to support SourceMaps
          // http://requirejs.org/docs/errors.html#sourcemapcomments
          preserveLicenseComments: false,
          useStrict: true,
          wrap: true,

          // use almond in production
          // https://github.com/asciidisco/grunt-requirejs/blob/master/docs/almondIntegration.md
          almond: true
        }
    }
    },
    useminPrepare: {
      html: '<%= yeoman.app %>/{,*/}*.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    svgmin: {
        dist: {
          files: [{
            expand: true,
            cwd: '<%= yeoman.app %>/images',
            src: '{,*/}*.svg',
            dest: '<%= yeoman.dist %>/images'
          }]
        }
    },
    cssmin: {
      dist: {
        options: {
          keepSpecilComments: 0
        },
        files: {
          '<%= yeoman.dist %>/styles/main.css': [
            '<%= yeoman.app %>/components/bootstrap/dist/css/bootstrap.min.css',
            '<%= yeoman.app %>/components/font-awesome/css/font-awesome.min.css',
            '<%= yeoman.app %>/styles/vendor/*.css',
            '.tmp/styles/*.css',
            '<%= yeoman.app %>/styles/*.css',
            '<%= yeoman.app %>/styles/responsive.css'
          ],
          // cssmin separate files
          //'<%= yeoman.dist %>/styles/separate/A.css': [
          //  '<%= yeoman.app %>/styles/separate/A.css'
          //]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: '*{,/*}.html',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    uglify: {
      options: {
          mangle: {
              sort: true,
              toplevel: false,
              eval: true,
              except: ['jQuery', 'Backbone', '$', '_'],
          },
          compress: true,
          report: 'gzip',
          wrap: true,
          preserveComments: false,
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>/scripts',
          dest: '<%= yeoman.dist %>/scripts',
          src: '**/*.js',
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'locales/*',
            'components/requirejs/require.js',
            'scripts/vendor/modernizr*.js'
          ]
        }]
      }
    },
    bower: {
      all: {
        rjsConfig: '<%= yeoman.app %>/scripts/main.js'
      }
    },
    concurrent: {
      nodemon_dev: {
        options: {
          logConcurrentOutput: true,
        },
        tasks: [
          'nodemon:dev',
          'watch'
        ]
      },
      nodemon_prod: {
        options: {
          logConcurrentOutput: true,
        },
        tasks: [
          'nodemon:prod',
          'watch'
        ]
      },
      server: [
        'clean:server',
        'coffee:dist',
        'compass:server'
      ],
      test: [
        'coffee',
        'compass',
        'handlebars:app'
      ],
      dist: [
        'coffee',
        'handlebars:app',
        'compass:dist',
        'svgmin',
        'htmlmin'
      ]
    },
    nodemon: {
      dev: {
        options: {
          file: './server/server.js',
          args: ['development'],
          watchedExtensions: ['js'],
          watchedFolders: ['server'],
          debug: false,
          delayTime: 2,
          env: {
            NODE_ENV: 'development'
          },
          cwd: __dirname
        }
      },
      prod: {
        options: {
          file: './server/server.js',
          args: ['development'],
          watchedExtensions: ['js'],
          watchedFolders: ['server'],
          debug: false,
          delayTime: 2,
          env: {
            NODE_ENV: 'production'
          },
          cwd: __dirname
        }
      }
    },
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: [],
        commit: false,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['-a'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false,
        pushTo: 'origin',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
      }
    }
  });

  grunt.registerTask('dev', [
    'concurrent:server',
    'concurrent:nodemon_dev'
  ]);

  grunt.registerTask('prod', [
    'build',
    'concurrent:nodemon_prod'
  ]);

  grunt.registerTask('test', [
    'clean:server',
    'coffee',
    'compass',
    'connect:test',
    'mocha'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'coffee',
    'compass:dist',
    'useminPrepare',
    'requirejs',
    'imagemin',
    'svgmin',
    'htmlmin',
    //'concat',
    'cssmin',
    //'uglify',
    'copy',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};
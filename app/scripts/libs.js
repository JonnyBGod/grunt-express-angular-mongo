/* global jQuery: false */
/* jshint unused: false */
require.config({
  paths: {
    jquery: '../components/jquery/jquery',
    bootstrap: '../components/bootstrap/dist/js/bootstrap',
    angular: '../components/angularjs-bower/angular',
    'angular-cookies': '../components/angularjs-bower/angular-cookies',
    'angular-sanitize': '../components/angularjs-bower/angular-sanitize'
  },
  shim: {
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    },
    angular: {
      deps: ['jquery'],
      exports: 'angular'
    },
    'angular-cookies': { deps: ['angular'] },
    'angular-sanitize': { deps: ['angular'] }
  },
  priority: [
    'jquery',
    'angular'
  ]
});

define(['jquery', 'bootstrap', 'angular', 'angular-cookies', 'angular-sanitize'],
  function ($, bootstrap, angular) {});
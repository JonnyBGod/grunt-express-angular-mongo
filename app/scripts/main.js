/* global jQuery: false */
/* jshint unused: false */
require.config({
  paths: {
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
    analytics: { deps: ['libs'], exports: 'analytics' },
    filters: { deps: ['libs'] },
    directives: { deps: ['libs'] },
    controllers: { deps: ['libs'] },
    'app': { deps: ['libs', 'analytics', 'filters', 'controllers'] },
    services: { deps: ['app'] }
  },
  priority: [
    'libs'
  ]
});

require(['domReady', 'libs', 'analytics', 'filters', 'directives', 'controllers', 'app', 'services'],
  function (domReady, analytics) {
  'use strict';
  domReady(function(){
    angular.element(document).ready(function leadFireAngular() {
      // when all is done, execute bootstrap angular application
      angular.bootstrap(document, ['app']);
    });
  });
});
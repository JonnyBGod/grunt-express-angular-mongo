'use strict';

/* Directives */

angular.module('directives', [])
	.directive('onDirective', ['$rootScope', function($rootScope) {
	    return function(scope, elm, attr) {
	    };
	}])
	.directive('anotherDirective', ['$rootScope', function($rootScope) {
	    return function(scope, elm, attr) {
	    };
	}]);

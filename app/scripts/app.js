'use strict';

// Declare app level module which depends on filters, and services
define(['angular', 'analytics', 'filters'], function (angular) {
    return angular.module('app', ['filters', 'analytics', 'directives', 'ngCookies', 'ngSanitize', 'controllers'])
		.config(['$locationProvider', function($locationProvider) {
	        $locationProvider.
	            html5Mode(true).hashPrefix('!');
	    }])
	    .config(['AnalyticsProvider', function(AnalyticsProvider) {
			AnalyticsProvider.account = 'YOUR_ACCOUNT_HERE';
		}])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider
				.otherwise({redirectTo: '/'});
		}]);
	
});
'use strict';

/* Filters */

angular.module('filters', [])
	.filter('oneFilter', function() { 
	    return function(a){
			return a;
	    };
	})
	.filter('anotherFilter', function() { 
		return function(a){
			return a;
	    };
	});